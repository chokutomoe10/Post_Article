package models

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Post struct {
	Id           int    `gorm:"primaryKey" json:"id"`
	Title        string `gorm:"type:varchar(200)" validate:"required,min=20" json:"title"`
	Content      string `gorm:"type:text" validate:"required,min=200" json:"content"`
	Category     string `gorm:"type:varchar(100)" validate:"required,min=3" json:"category"`
	Created_date string `gorm:"type:timestamp;not null;default:now()" json:"created_date"`
	Updated_date string `gorm:"type:timestamp;not null;default:now()" json:"updated_date"`
	Status       string `gorm:"type:varchar(100)" validate:"required,oneof=publish draft thrash" json:"status"`
}

var DB *gorm.DB

func DatabaseConnect() {
	db, err := gorm.Open(mysql.Open("root:@tcp(127.0.0.1:3306)/article"), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	db.AutoMigrate(&Post{})

	DB = db
}
