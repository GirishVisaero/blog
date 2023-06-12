"use client";

import React from "react";
import Input from "./Input";
import Container from "./Container";
import Button from "./Button";
import axios from "@/lib/axiosInstance";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {};

interface PostCreateProps {
  name: string;
  title: string;
  content: string;
}

const PostCreate = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PostCreateProps>({
    defaultValues: {
      name: "",
      title: "",
      content: "",
    },
    criteriaMode: "all",
    mode: "onTouched",
  });

  const onSubmit = async (data: PostCreateProps, e: any) => {
    e.preventDefault();
    console.log(data, "..>>");
    try {
    //   debugger;
      // const { content, name, title } = data;
      let res = await axios.post(
        "http://localhost:8080/api/post",
        {
          ...data,
        },
      );
      if (res) {
        toast.success("Post created successfully!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Container className="p-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white w-full p-3 rounded ">
          <div className="mb-3">
            <Input type="text" className="max-w-md" {...register("name")} />
          </div>
          <div className="mb-3">
            <Input type="text" className="max-w-md" {...register("title")} />
          </div>
          <div className="mb-3">
            <textarea
              {...register("content")}
              className="
            bg-gray-50 border
           border-gray-300
            text-gray-900
             ring-inset sm:text-sm rounded-lg focus:rign-2
              ring-offset-2 focus:outline-none focus:ring-indigo-600
               focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <Button>Submit</Button>
        </div>
      </form>
    </Container>
  );
};

export default PostCreate;
