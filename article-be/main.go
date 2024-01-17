package main

import (
	"article-be/models"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type IError struct {
	Field string
	Tag   string
	Value string
}

func main() {
	models.DatabaseConnect()

	e := echo.New()

	e.Use(middleware.CORS())
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:1323"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))

	var Validator = validator.New()

	e.GET("/article/:limit/:offset", func(c echo.Context) error {
		var articles []models.Post

		limit, errLimit := strconv.ParseInt(c.Param("limit"), 10, 64)

		if errLimit != nil {
			return errLimit
		}

		offset, errOffset := strconv.ParseInt(c.Param("offset"), 10, 64)

		if errOffset != nil {
			return errOffset
		}

		models.DB.Limit(int(limit)).Offset(int(offset)).Find(&articles)

		return c.JSON(http.StatusOK, articles)
	})

	e.GET("/article/:id", func(c echo.Context) error {
		var article models.Post

		models.DB.Find(&article, "id = ?", c.Param("id"))

		return c.JSON(http.StatusOK, article)
	})

	e.POST("/article", func(c echo.Context) error {
		var article models.Post
		var errors []IError

		if errBody := c.Bind(&article); errBody != nil {
			return errBody
		}

		err := Validator.Struct(&article)
		if err != nil {
			for _, errValidation := range err.(validator.ValidationErrors) {
				var errVal IError
				errVal.Field = errValidation.Field()
				errVal.Tag = errValidation.Tag()
				errVal.Value = errValidation.Param()
				errors = append(errors, errVal)
			}
			return c.JSON(http.StatusBadRequest, errors)
		}

		models.DB.Create(&article)

		return c.JSON(http.StatusOK, article)
	})

	e.PUT("/article/:id", func(c echo.Context) error {
		var article models.Post
		var errors []IError

		id, errId := strconv.ParseInt(c.Param("id"), 10, 64)

		if errId != nil {
			return errId
		}

		if errBody := c.Bind(&article); errBody != nil {
			return errBody
		}

		err := Validator.Struct(&article)
		if err != nil {
			for _, errValidation := range err.(validator.ValidationErrors) {
				var errVal IError
				errVal.Field = errValidation.Field()
				errVal.Tag = errValidation.Tag()
				errVal.Value = errValidation.Param()
				errors = append(errors, errVal)
			}
			return c.JSON(http.StatusBadRequest, errors)
		}

		models.DB.Where("id = ?", c.Param("id")).Updates(&article)

		article.Id = int(id)

		return c.JSON(http.StatusOK, article)
	})

	e.DELETE("/article/:id", func(c echo.Context) error {
		var article models.Post

		models.DB.Delete(&article, "id = ?", c.Param("id"))

		return c.JSON(http.StatusOK, article)
	})

	e.Logger.Fatal(e.Start(":1323"))
}
