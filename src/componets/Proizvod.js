import React from "react";
import { pr_names } from "../logic";

const options_elm = pr_names.map(pr_name => (
  <option key={pr_name}>{pr_name}</option>
));

function Proizvod() {
  return (
    <div>
     <p><select id="proizv">{options_elm}</select></p>
    </div>
  );
}

export default Proizvod;
