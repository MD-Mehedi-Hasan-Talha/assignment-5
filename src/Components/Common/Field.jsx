import React from "react";

export default function Field({
  label,
  children,
  htmlFor,
  error,
  isMandatory,
}) {
  const id = htmlFor || getChildProps(children).id;
  const type = getChildProps(children).type;

  return (
    <div className={`mb-6 ${type === "checkbox" && "flex gap-2 items-center"}`}>
      {type === "checkbox" && children}

      {label && (
        <label
          htmlFor={id}
          className={`block ${type !== "checkbox" && " mb-2"}`}
        >
          {label}
          {isMandatory && (
            <span className="text-red-700 font-bold ml-[2px]">*</span>
          )}
        </label>
      )}

      {type !== "checkbox" && children}

      {error && (
        <div role="alert" className="text-red-600">
          {error.message}
        </div>
      )}
    </div>
  );
}

const getChildProps = (children) => {
  const child = React.Children.only(children);
  return child.props;
};
