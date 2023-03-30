import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import Accordion from 'shared/components/Accordion';

const QUESTIONS = [
  {
    question: 'What is Crosscourt?',
    answer:
      'A basketball inspired social club built around thoughtfully designed spaces, a community bonded by team-sport, and member driven experiences that enable professionals in the game of life to elevate socially, mentally, and physically.',
  },
  {
    question: 'Who is Crosscourt for?',
    answer:
      "Our members are Professionals in the game of life. They are ambitious and leverage Crosscourt to bring out the best in themselves as well as those around them. They know sport is the ultimate catalyst for anyone looking to be their best self.\n\nThey recognize that rather than the skills of footwork, dribbling, or shooting, the game of life demands that you elevate your physical, mental, and emotional well-being. They know there's more to life than the level they're at now. They are never complacent. They're ready to discover the extent of their capabilities and seek out people, places, and perspectives that will bring out the best in them.\n\nThey've read books, adopted a self-reflection practice, or become an avid podcast listener but realize that these passive avenues of evolving don't help them integrate any new skills into your life fast enough to help them reach that next level.\n\nThey seek out elevated and tasteful experiences that will help them take that next step in life. Our members think back to our days on the court and recognize how basketball taught us so much about life. That's why we created Crosscourt. It's a vehicle for professionals in the game of life, at every level, to rediscover how team - sport is the best catalyst for social, mental and physical growth.Our spaces, experiences, and community are designed to help you connect, create and compete.",
  },
  {
    question: 'Why does Crosscourt exist?',
    answer:
      "To be a platform for progress. CROSSCOURT'S ECOSYSTEM LEVERAGES SPACES, EXPERIENCES & OUR COMMUNITY TO PUSH EACH OTHER TO BE OUR BEST, NOT THE BEST.\n\nFrom curated social events to mindfulness work, to skill development, and live competition, everything we do is built in the pursuit of progress. We, along with our members, are constantly evolving and working in unison to achieve a common goal.\n\nOur members overcome forces, issues, headwinds, and other roadblocks that prevent them from being their best. Before Crosscourt, our members may feel doubt, a lack of confidence, isolated, lethargy, malaise, a lack of motivation, a general blockage or complacency and are frustrated by the lack of opportunities that will help bring out the best in them. We change that. ",
  },
  {
    question: 'How was Crosscourt started?',
    answer:
      'When our founders met in college, they bonded over their love for sport - specifically team sport. Why? Because team sport provides opportunities for self-improvement, self-discovery, and authentic connection.\n\nAfter entering the workforce, they realized that the opportunities provided by team sport were not as easy to find in their professional careers. But they believed the connection between the sports that inspired them and the lives they envisioned was too strong to ignore. So they created Crosscourt - a team sport inspired social club, community and platform designed to help professionals in the game of life reach their potential through the power of team sport.',
  },
  {
    question: "What if I'm not good at basketball?",
    answer:
      'We are not basketball. We use basketball and the culture of sport to be the spark plug for personal and professional growth. Sport is the source of energy that brings people together. We leverage sports for individual development, community creation, and societal progression. Our experiences are built to uplift athletes of any skill level and helping our members get to that next level, whether physically, personally, or professionally, is our mission.',
  },
  {
    question: 'How can Crosscourt help me in my personal or professional life?',
    answer:
      "TEAM SPORT IS THE BEST CATALYST FOR CULTIVATING CONNECTIONS, DEVELOPING THE SELF, & LIVING WELL. They bolster the five C's: competence, confidence, connections, character, and creativity. These are skills and tools that are needed to achieve success not only as an athlete, but as an everyday professional.\n\nDo you remember what it was like the first time you played sports? The lessons you learned from the game became foundational pillars in your life. You learned communication, unlocked creativity, found community and realized the importance of competition. But most of all you discovered that you didn't have to be the best but you could be the best version of yourself.\n\nParticipating in team sport provides tools and skills to help you succeed in your career and personal life. Problem solving, critical thinking, adaptability, hard work, communication, and attention to detail are universal success multipliers. Simply put, team sport provides a template for unlocking progress throughout your life.\n\nOur spaces, community, and experiences are curated for the everyday professional looking for tools that will enable them to make progress personally, professionally, and physically.",
  },
  {
    question:
      'What do mean by basketball is the best catalyst for social, mental, and physical growth?',
    answer:
      "When we refer to social evolution at Crosscourt we're talking about personal and professional development. It's a place where you'll connect with like-minded people who are on the same journey you are. It's where you'll meet people who are the source of inspiration that you're looking for. You'll meet your next co-founder, your next “bromance”, or mentor. Team Sport connects people, places, perspectives, and philosophy to create conditions that maximize potential.\n\nMentally, the way you compete in team sports is a reflection of who you are. From how you condition yourself to show up to how you communicate with teammates—the basics of team sport can be used to help you progress in life. When you get your membership at Crosscourt, it's more than about scoring points on our courts. It's about learning discipline, how to work with others, how to handle failure, developing resilience, meeting adversity, dreaming big, what it means to be a leader, the benefits of hard work, and practicing them all in real time.\n\nPhysically, our spaces and experiences are designed to give you a great workout, sweat, and that dopamine rush that keeps you motivated.",
  },
  {
    question: "What happens if I don't join Crosscourt?",
    answer:
      "When you don't learn how to fully commit yourself to what you're capable of, you risk missing out on the vibrancy of all that life has to offer you. When you choose not to step onto the court or into the club, you risk living a life of untapped potential, connections, and creativity.",
  },
  {
    question: 'What can I expect to gain from my membership at Crosscourt?',
    answer:
      "As a result of coming to Crosscourt, you'll notice significant changes in how you experience your life, particularly the level of self-empowerment and confidence you feel to take risks that will enable you to access your potential.\n\nYou'll also develop a deeper understanding of what each next right step is for you. By learning to feel secure in who you are and your direction, you'll begin to live life unapologetically. You'll be unstoppable, fueled by your desire to evolve.\n\nIf you take full advantage of what we have to offer, you'll connect and create personal and professional relationships with other members of your community that have the opportunity to change your life.",
  },
  {
    question: "What are Crosscourt's hours of operation?",
    answer:
      "You can see when we're open by visiting the schedule page on our website, but generally, we're open from 7 AM to 10 PM Monday through Friday and then 8 AM to 4 PM Saturday and Sunday. Hours are subject to change.",
  },
  {
    question: 'How do I get involved?',
    answer:
      'The first step is deciding you are ready to commit your time and energy into something that is going to help you grow by challenging you. If that sounds good to you, choose a membership that works for you, and enter the world of CC. Once a member we will provide you with the resources and tools to help you become integrated with the ccteam. If you have any questions, feel free to reach out.',
  },
];

const FaqList = ({ showInBatches, className }) => {
  const questionsLength = QUESTIONS.length;
  const [questionsShown, setQuestionsShow] = useState(showInBatches || questionsLength);

  return (
    <div className={className}>
      {QUESTIONS.map(({ question, answer }, index) =>
        index < questionsShown ? (
          <Accordion
            key={index}
            title={question}
            className="hover:bg-cc-blue-700 transition-all duration-300 whitespace-pre-line mb-2"
          >
            {answer}
          </Accordion>
        ) : null
      )}
      {questionsShown < questionsLength && (
        <div
          onClick={() => setQuestionsShow(questionsShown + showInBatches)}
          className="bg-cc-blue-900 text-white px-4 py-2 text-center text-xs cursor-pointer hover:bg-cc-blue-700 transition-all duration-300"
        >
          Show More
          <FontAwesomeIcon className="ml-2" icon={faChevronDown} />
        </div>
      )}
    </div>
  );
};

FaqList.defaultProps = {
  showInBatches: null,
  className: '',
};

FaqList.propTypes = {
  showInBatches: PropTypes.number,
  className: PropTypes.string,
};

export default FaqList;
