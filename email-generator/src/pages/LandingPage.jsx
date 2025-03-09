import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLightningBolt, HiOutlineUserGroup } from 'react-icons/hi';
import React,{ useEffect,useState } from 'react';

const LandingPage = () => {
    const [step, setStep] = useState(0);
  // Animate sections when scrolling into view
  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);



  const textVariant = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: { delay: i * 0.05 } // Delays each letter slightly
    })
  };
  
  const AnimatedText = ({ text, className }) => (
    <motion.div className={className} initial="hidden" animate="visible">
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={textVariant} custom={index}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
  
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-20 md:pb-28">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 md:pr-8 mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-secondary-900 mb-4">
                Personalized Emails <span className="text-primary-600">Powered by AI</span>
              </h1>
              <p className="text-lg md:text-xl text-secondary-600 mb-8">
                Create perfectly tailored emails in seconds. Save time and improve communication with our AI-powered email generator.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/generate" className="btn-primary text-center">
                  Generate Email
                </Link>
                <a href="#how-it-works" className="btn-secondary text-center">
                  Learn More
                </a>
              </div>
            </motion.div>
            <motion.div
      className="md:w-1/2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="relative bg-white rounded-xl shadow-xl p-6 border border-secondary-100">
        {/* Header */}
        <div className="flex items-center mb-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="ml-4 px-2 py-1 bg-secondary-100 text-black text-xs rounded">
            AI Personalized Email Generator
          </div>
        </div>

        {/* How It Works Section */}
        <div className="space-y-3">
          <AnimatedText text="Demo" className="text-xl font-semibold text-black" />
          <AnimatedText
            text="Creating a professional email is effortless with our AI-powered system. Just follow these simple steps:"
            className="text-black"
          />

          <div className="space-y-4 mt-4">
            {/* Step 1 */}
            <motion.div
              className="flex items-center p-3 bg-secondary-200 rounded-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-6 h-6 bg-primary-500 text-black flex items-center justify-center rounded-full mr-3 font-bold">
                1
              </div>
              <AnimatedText
                text="Enter Details: Provide the subject, recipient’s name, and a short description."
                className="text-black"
              />
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="flex items-center p-3 bg-secondary-100 rounded-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="w-6 h-6 bg-primary-500 text-black flex items-center justify-center rounded-full mr-3 font-bold">
                2
              </div>
              <AnimatedText
                text="AI Generates Email: Our AI analyzes your input and crafts a well-structured email."
                className="text-black"
              />
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="flex items-center p-3 bg-secondary-100 rounded-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="w-6 h-6 bg-primary-500 text-black flex items-center justify-center rounded-full mr-3 font-bold">
                3
              </div>
              <AnimatedText
                text="Review & Send: Make adjustments if needed, then send the email instantly."
                className="text-black"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-secondary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Our AI-powered email generator helps you create professional, personalized emails for any purpose.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="">
              <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-5">
                <HiOutlineMail className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Personalized Content</h3>
              <p className="text-secondary-600">
                Generate emails tailored to your recipient's needs and preferences, making each message unique and effective.
              </p>
            </div>

            <div className="">
              <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-5">
                <HiOutlineLightningBolt className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Time-Saving</h3>
              <p className="text-secondary-600">
                Create professional emails in seconds, not minutes. Focus on what matters while our AI handles the writing.
              </p>
            </div>

            <div className="">
              <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-5">
                <HiOutlineUserGroup className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Professional Tone</h3>
              <p className="text-secondary-600">
                All emails are crafted with a professional tone that builds credibility and strengthens relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

  {/* How It Works Section */}
<section id="how-it-works" className="py-10 text-black">
  <div className="container">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
        How It Works
      </h2>
      <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
        Creating the perfect email is easier than ever with our AI-powered system.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {/* Step 1 */}
      <div className="bg-white shadow-lg rounded-lg p-6 border">
        <div className="bg-primary-600 text-black w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
          1
        </div>
        <h3 className="text-xl font-semibold text-secondary-900 mb-3 text-center">
          Enter Details
        </h3>
        <p className="text-secondary-600 text-center">
          Provide the email subject, description, and recipient information in our simple form.
        </p>
      </div>

      {/* Step 2 */}
      <div className="bg-white shadow-lg rounded-lg p-6 border">
        <div className="bg-primary-600 text-black w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
          2
        </div>
        <h3 className="text-xl font-semibold text-secondary-900 mb-3 text-center">
          AI Generation
        </h3>
        <p className="text-secondary-600 text-center">
          Our AI processes your input and generates a professional, personalized email in seconds.
        </p>
      </div>

      {/* Step 3 */}
      <div className="bg-white shadow-lg rounded-lg p-6 border">
        <div className="bg-primary-600 text-black w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
          3
        </div>
        <h3 className="text-xl font-semibold text-secondary-900 mb-3 text-center">
          Send or Edit
        </h3>
        <p className="text-secondary-600 text-center">
          Review the generated email, make any desired adjustments, and send it to your recipient.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Email Communication?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Generate professional, personalized emails in seconds with our powerful AI tool.
            </p>
            <Link to="/generate" className="btn bg-blue-500 rounded-lg p-2 text-primary-700 hover:bg-primary-50 focus:ring-white">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-secondary-300 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold text-white mb-3">AI Email</div>
              <p className="max-w-sm">
                Save time and improve communication with our AI-powered email generator.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  Product
                </h3>
                <ul className="space-y-3">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  Company
                </h3>
                <ul className="space-y-3">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  Legal
                </h3>
                <ul className="space-y-3">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-secondary-800 text-sm">
            <p>&copy; {new Date().getFullYear()} AI Email Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;