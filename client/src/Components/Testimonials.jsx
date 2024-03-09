import FeedbackCard from "./FeedbackCard";
import person1 from "../assets/person1.jpeg";
import person2 from "../assets/person2.jpeg";
import person3 from "../assets/person3.jpeg";

const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",

  heading2: "font-poppins font-semibold text-[40px] text-black   w-full text-center",
  paragraph: "font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",
};
const feedback = [
  {
    id: "feedback-1",
    content:
      "Their car rental service is exceptional. It made my trip hassle-free and enjoyable.",
    name: "Radhika Merchant",
    title: "Frequent Traveler",
    img: person1,
  },
  {
    id: "feedback-2",
    content:
      "Finding parking has never been easier with their platform. It saved me a lot of time and stress.",
    name: "Mark Zuckerberg",
    title: "Daily Commuter",
    img: person2,
  },
  {
    id: "feedback-3",
    content:
      "I highly recommend their car rental and parking services. Professional and reliable.",
    name: "Elon Musk",
    title: "Happy Customer",
    img: person3,
  },
];


const Testimonials = () => (
  <section id="clients" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `} data-aos="fade-up">
    <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

    <div className="w-full flex justify-between items-center flex-col relative z-[1]">
      <h2 className={styles.heading2}>
        What People are  saying about us
      </h2>
    </div>
    <div className="flex flex-wrap sm:justify-start justify-center pl-1 pt-5 w-full relative z-[1]">
      {feedback.map((card) => <FeedbackCard key={card.id} {...card} />)}
    </div>
  </section>
);

export default Testimonials;