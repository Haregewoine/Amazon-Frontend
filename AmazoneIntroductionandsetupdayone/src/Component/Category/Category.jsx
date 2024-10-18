import React from "react";
import { categoryInfos } from "./CatagoryFullInfos";
import CategoryCard from "./CategoryCard";
import classes from "./Catagory.module.css";
function Category() {
  return (
    <section className={classes.category_container}>
      {categoryInfos.map((infos) => (
        <CategoryCard key={infos.imgLink} data={infos} />
      ))}
    </section>
  );
}

export default Category;
