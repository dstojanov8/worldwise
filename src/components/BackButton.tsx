import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";

const BackButton = () => {
  const navigate = useNavigate();

  // -1 means to navigate back one step (previous page)
  const handleNavigateBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <Button type="back" onClick={(e) => handleNavigateBack(e)}>
      &larr; Back
    </Button>
  );
};

export default BackButton;
