package middleware

import (
	"context"
	"fmt"
	"strings"

	"firebase.google.com/go/auth"
	"github.com/labstack/echo/v4"
)

func Auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		client := c.Get("firebaseAuth").(*auth.Client)

		auth := c.Request().Header.Get("Authorization")
		idToken := strings.TrimSpace(strings.Replace(auth, "Bearer", "", 1))
		if idToken == "" {
			return fmt.Errorf("id token not available")
		}

		token, err := client.VerifyIDToken(context.Background(), idToken)
		if err != nil {
			return err
		}

		c.Set("UUID", token.UID)
		return next(c)
	}
}
