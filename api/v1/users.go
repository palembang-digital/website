package api

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

// Get an user
// @Summary Get an user
// @Description Get an user by id
// @Tags users
// @ID get-user
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {object} db.User
// @Router /users/{uid} [get]
func (api *API) getUser(c echo.Context) error {
	ctx := c.Request().Context()

	uid := c.Get("UUID").(string)

	user, err := api.usersService.GetUser(ctx, uid)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, user)
}

// Create a new user
// @Summary Create a new user
// @Description Create a new user
// @Tags users
// @ID create-user
// @Produce json
// @Param user body db.User true "Create user"
// @Success 201 {object} db.User
// @Router /users [post]
func (api *API) createUser(c echo.Context) error {
	ctx := c.Request().Context()

	uid := c.Get("UUID").(string)

	user := new(rawUser)
	if err := c.Bind(user); err != nil {
		return err
	}

	user.Uid = uid

	if err := api.userValidator(user); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	newUser, err := api.usersService.CreateUser(ctx, user.User)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, newUser)
}

// Delete an user
// @Summary Delete an user
// @Description Delete an user by id
// @Tags users
// @ID delete-user
// @Produce plain
// @Param id path int true "User ID"
// @Success 204 {string} string ""
// @Router /users/{uid} [delete]
func (api *API) deleteUser(c echo.Context) error {
	ctx := c.Request().Context()

	uid := c.Param("uid")

	if err := api.usersService.DeleteUser(ctx, uid); err != nil {
		return err
	}

	return c.String(http.StatusNoContent, "")
}
