import React from "react";
import Playbooks from "./Playbooks";

const Hero = () => {
  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold">The Dev Interview Playbook</h1>
      <p className="text-sm text-foreground/50">
        A free, open-source collection of interview questions, answers, tips &
        study guides — all in one place.
      </p>

      <div className="border-t-1 border-foreground mt-10" />

      <Playbooks />
    </div>
  );
};

export default Hero;
