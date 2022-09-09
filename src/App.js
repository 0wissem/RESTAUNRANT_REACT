import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// login
import Login from "./screens/Login";

// dashboard
import Dashboard from "./screens/dashboard/dashboard";

//employees
import Employees from "./screens/employee/employees";
import AddEmployee from "./screens/employee/employees_create";
import EditEmployee from "./screens/employee/employees_edit";

//ingredients
import Ingredients from "./screens/ingredient/ingredients";
import AddIngredient from "./screens/ingredient/ingredients_create";
import EditIngredient from "./screens/ingredient/ingredients_edit";

//Recipes
import Recipes from "./screens/recipe/recipes";
import AddRecipe from "./screens/recipe/recipes_create";
import EditRecipe from "./screens/recipe/recipes_edit";

//orders
import Orders from "./screens/orders/orders";
import OrderClient from "./screens/orders/orderClient";

//Family
import Families from "./screens/family/families";
import AddFamily from "./screens/family/families_create";
import EditFamily from "./screens/family/families_edit";
import Container from "./screens/Container";
import Privacy from "./components/Privacy";
import { useSelector } from "react-redux";
import { ROLES } from "./constants/models";

function App() {
  const role = useSelector((state) => state?.user?.data?.role || undefined);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/" element={<Container />}>
            <Route
              path="dashboard"
              element={
                <Privacy show={role === ROLES.ADMIN}>
                  <Dashboard />
                </Privacy>
              }
            />
            <Route
              path="employees"
              element={
                <Privacy show={role === ROLES.ADMIN}>
                  <Employees />
                </Privacy>
              }
            />
            <Route
              path="employee/add"
              element={
                <Privacy show={role === ROLES.ADMIN}>
                  <AddEmployee />
                </Privacy>
              }
            />
            <Route
              path="employee/edit/:id"
              element={
                <Privacy show={role === ROLES.ADMIN}>
                  <EditEmployee />
                </Privacy>
              }
            />

            <Route
              path="ingredient"
              element={
                <Privacy show={role === ROLES.ADMIN}>
                  <Ingredients />
                </Privacy>
              }
            />
            <Route
              path="ingredient/add"
              element={
                <Privacy show={role === ROLES.ADMIN}>
                  <AddIngredient />
                </Privacy>
              }
            />
            <Route
              path="ingredient/edit/:id"
              element={
                <Privacy show={role === ROLES.ADMIN}>
                  <EditIngredient />
                </Privacy>
              }
            />

            <Route
              path="recipe"
              element={
                <Privacy>
                  <Recipes />
                </Privacy>
              }
            />
            <Route
              path="recipe/add"
              element={
                <Privacy show={role === ROLES.ADMIN}>
                  <AddRecipe />
                </Privacy>
              }
            />
            <Route
              path="recipe/edit/:id"
              element={
                <Privacy show={role === ROLES.ADMIN}>
                  <EditRecipe />
                </Privacy>
              }
            />

            <Route
              path="order"
              element={
                <Privacy>
                  <Orders />
                </Privacy>
              }
            />
            <Route
              path="orderClient"
              element={
                <Privacy>
                  <OrderClient />
                </Privacy>
              }
            />
            <Route
              path="family"
              element={
                <Privacy show={role === ROLES.ADMIN}>
                  <Families />
                </Privacy>
              }
            />
            <Route
              path="family/add"
              element={
                <Privacy show={role === ROLES.ADMIN}>
                  <AddFamily />
                </Privacy>
              }
            />
            <Route
              path="family/edit/:id"
              element={
                <Privacy show={role === ROLES.ADMIN}>
                  <EditFamily />
                </Privacy>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
