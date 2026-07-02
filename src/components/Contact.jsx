'use client'
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import ErrorBoundary from "./ErrorBoundary";
import { SectionWrapper } from "./hoc";
import { slideIn } from "../utils/motion";
import { toast } from "react-hot-toast";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all the fields.");
      return;
    }
    setLoading(true);
    try {
    emailjs
      .send(
        process.env.SERVICE_ID,
        process.env.TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Zaid Ansari",
          from_email: form.email,
          to_email: "iamzaidansari166@gmail.com",
          message: form.message,
        },
        process.env.PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          toast.success("Thanks for reaching out. I'll get back to you soon.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error('FAILED...', error);

          toast.error("Oops! Something went wrong. Please try again.");
        }
        
      );
    } catch (error) {
      setLoading(false);
      console.error('FAILED...', error);
      toast.error("Oops! Something went wrong. Please try again.");
    }
  };

  const inputClass =
    "glass py-4 px-6 placeholder:text-secondary text-ink rounded-xl outline-none font-medium focus:border-accent-cyan/60 transition-colors";

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] glass-card rounded-3xl p-8'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <p className="mt-3 text-secondary text-[16px] max-w-md leading-[26px]">
          Have a project, an AI idea, or a role in mind? Drop me a message — I
          usually reply within a day.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-10 flex flex-col gap-6'
        >
          <label className='flex flex-col'>
            <span className='text-ink font-medium mb-3'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className={inputClass}
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-ink font-medium mb-3'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className={inputClass}
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-ink font-medium mb-3'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className={inputClass}
            />
          </label>

          <button
            type='submit'
            className='inline-flex items-center justify-center gap-2 py-3.5 px-10 rounded-full outline-none w-fit text-white font-bold bg-gradient-to-r from-accent-violet via-accent-purple to-accent-cyan bg-[length:200%_auto] hover:bg-[position:right_center] transition-all duration-500 shadow-glow'
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <ErrorBoundary fallback={null}>
          <EarthCanvas />
        </ErrorBoundary>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
