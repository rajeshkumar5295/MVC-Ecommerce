import React from "react";

const CategoryForm = ({value,setValue,handleSubmit}) => {
  return (
    <>
      < form  onSubmit={handleSubmit} >
      <div className="flex flex-row justify-between" >
      <div className="mb-3  w-72">
          <input 
             value={value}
             onChange={(e)=>setValue(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter new Category"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      </form>
    </>
  );
};

export default CategoryForm;
