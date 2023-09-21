import React from "react";
import { NavLink, Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div class="list-group">
          <h4> Admin Panel </h4>

          <Link
           to="/dashboard/admin/create-category "
            className="list-group-item list-group-item-action "
            
          >
            Create Category
          </Link>
          <Link to="/dashboard/admin/create-product " className="list-group-item list-group-item-action">
            Create Product
          </Link>

          <Link to="/dashboard/admin/products " className="list-group-item list-group-item-action">
             Products
          </Link>
             
          <Link to="/dashboard/admin/orders " className="list-group-item list-group-item-action">
               Orders 
          </Link>

          <Link to="/dashboard/admin/users" className="list-group-item list-group-item-action">
            Users
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
