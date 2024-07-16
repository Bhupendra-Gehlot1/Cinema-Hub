
import React from "react";
import './Button.css';


const Button = ({content, link}) => {
    return (
        <a href={link} class="btn10">
             <span>{content}</span>
          <div class="transition"></div>
        </a>
    );
  };

  export default Button