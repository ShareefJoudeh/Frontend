import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react';

const Home = () => {
  const features = [
    { icon: BookOpen, title: 'SkillSwap Marketplace', description: 'Teach what you know, learn what you need. Earn credits by teaching and spend them on learning new skills.' },
    { icon: Users, title: 'StudyCircle Groups', description: 'Join or create study groups for your courses. Collaborate with peers through shared resources, chat, and quizzes.' },
    { icon: Award, title: 'Credit-Based Economy', description: 'Every teaching session earns you credits. Use them to book sessions with others. Fair exchange, mutual growth.' },
    { icon: TrendingUp, title: 'Track Your Progress', description: 'Monitor your learning journey, rate sessions, and build your reputation as both a teacher and learner.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xl border border-teal-200/40 rounded-full mb-6 shadow-md">
          <div className="w-2 h-2 rounded-full animate-pulse bg-teal-600"></div>
          <span className="text-sm font-medium text-teal-900">Join 1000+ Active Learners</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-slate-900">
          Learn Together,<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-teal-700 to-teal-400">Grow Together</span>
        </h1>

        <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-slate-600">
          A revolutionary collaborative learning platform where students empower each other through skill sharing and group study.
        </p>

        <div className="flex gap-4">
          <Link to="/signup" className="px-8 py-4 rounded-2xl font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-all flex items-center gap-2">
            Get Started Free &rarr;
          </Link>
          <Link to="/signin" className="px-8 py-4 rounded-2xl font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all">
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-7xl mx-auto px-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-4">
                <Icon className="w-7 h-7 text-teal-700" />
              </div>
              <h3 className="font-bold mb-2 text-lg text-slate-900">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="text-center py-20 px-4 bg-white border-t border-slate-200">
        <h2 className="text-3xl font-bold mb-4 text-slate-900">Ready to start learning?</h2>
        <p className="mb-8 max-w-lg mx-auto text-slate-500">Join thousands of students already learning and teaching on SkillCircle</p>
        <Link to="/signup" className="px-8 py-4 rounded-2xl font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-all inline-flex items-center gap-2">
          Join SkillCircle Today &rarr;
        </Link>
      </div>
    </div>
  );
};

export default Home;