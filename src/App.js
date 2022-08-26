import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "./screens/Admin";

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

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/" element={<Admin />}>
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="employees" element={<Employees />} />
            <Route path="employee/add" element={<AddEmployee />} />
            <Route path="employee/edit/:id" element={<EditEmployee />} />

            <Route path="ingredient" element={<Ingredients />} />
            <Route path="ingredient/add" element={<AddIngredient />} />
            <Route path="ingredient/edit/:id" element={<EditIngredient />} />

            <Route path="recipe" element={<Recipes />} />
            <Route path="recipe/add" element={<AddRecipe />} />
            <Route path="recipe/edit/:id" element={<EditRecipe />} />

            <Route path="order" element={<Orders />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
