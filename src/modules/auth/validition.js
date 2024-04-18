import joi from "joi";

export const signup = {
  body: joi
    .object({
      fname: joi.string().min(3).max(20).required(),
      lname: joi.string().min(3).max(20).required(),
      email: joi
        .string()
        .email({
          minDomainSegments: 1,
          maxDomainSegments: 4,
          tlds: { allow: ["com", "eg", "edu"] },
        })
        .required(),
      password: joi
        .string()
        .pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"))
        .required(),
      confirmpassword: joi.string().valid(joi.ref("password")),
    })
    .required(),
};

export const login = {
  body: joi
    .object({
      email: joi
        .string()
        .email({
          minDomainSegments: 1,
          maxDomainSegments: 4,
          tlds: { allow: ["com", "eg", "edu"] },
        })
        .required(),
      password: joi
        .string()
        .pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")),
    })
    .required(),
};
