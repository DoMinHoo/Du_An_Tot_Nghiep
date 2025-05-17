import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 1000,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
      trim: true,
    },
    image: {
      type: [String], // Mảng các URL ảnh
      validate: {
        validator: function (arr) {
          return arr.every((url) => typeof url === "string");
        },
        message: "Tất cả URL hình ảnh phải là chuỗi.",
      },
      default: [],
    },
    stock_quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    color: {
      type: String,
      maxlength: 100,
      trim: true,
    },
    material: {
      type: String,
      maxlength: 100,
      trim: true,
    },
    size: {
      type: String,
      maxlength: 50,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("Products", productSchema);

export default productModel;
