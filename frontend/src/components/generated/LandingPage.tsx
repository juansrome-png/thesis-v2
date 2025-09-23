import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Brain, BarChart3, Target, Zap, Menu, X, ArrowRight, CheckCircle, Users, Award, Globe } from 'lucide-react';
interface LandingPageProps {
  onGetStarted: () => void;
}

// @component: LandingPage
export const LandingPage = ({
  onGetStarted
}: LandingPageProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const features = [{
    icon: TrendingUp,
    title: "Smart Portfolio Tracking",
    description: "Monitor your investments across stocks, crypto, bonds, and ETFs with real-time performance metrics."
  }, {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Get personalized portfolio summaries and investment thesis analysis powered by advanced AI."
  }, {
    icon: Target,
    title: "Thesis Health Alerts",
    description: "Stay informed with intelligent alerts that track how market conditions align with your investment theses."
  }, {
    icon: BarChart3,
    title: "Benchmark Comparisons",
    description: "Compare your portfolio performance against major indices like S&P 500 with detailed analytics."
  }, {
    icon: Shield,
    title: "Secure & Private",
    description: "Your financial data is protected with bank-grade security and encryption protocols."
  }, {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Get instant updates on market movements and their impact on your investment strategies."
  }] as any[];
  const benefits = ["Track unlimited portfolios and assets", "AI-generated portfolio insights and summaries", "Real-time market data and price alerts", "Thesis monitoring with news sentiment analysis", "Advanced performance analytics and reporting"];

  // @return
  return <div className="min-h-screen bg-white">
      <header className="relative bg-white border-b border-gray-100">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Thesis</h1>
              </div>
              <span className="hidden sm:block text-sm text-gray-500 border-l border-gray-200 pl-4">
                Intelligent Investment Tracking
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <button className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Features
              </button>
              <button className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Pricing
              </button>
              <button className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                About
              </button>
              <button onClick={onGetStarted} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Get Started
              </button>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && <motion.div initial={{
          opacity: 0,
          y: -10
        }} animate={{
          opacity: 1,
          y: 0
        }} className="md:hidden border-t border-gray-100 py-4 space-y-4">
              <button className="block text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Features
              </button>
              <button className="block text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Pricing
              </button>
              <button className="block text-gray-600 hover:text-blue-600 transition-colors font-medium">
                About
              </button>
              <button onClick={onGetStarted} className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Get Started
              </button>
            </motion.div>}
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1 initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} className="text-4xl sm:text-6xl font-bold text-gray-900 leading-tight">
                <span>Invest with</span>
                <br />
                <span className="text-blue-600">Intelligence</span>
              </motion.h1>
              
              <motion.p initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.1
            }} className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 leading-relaxed">
                Track your portfolio performance, validate your investment theses with AI-powered insights, 
                and stay ahead of market trends with intelligent alerts and analysis.
              </motion.p>

              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={onGetStarted} className="group bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold text-lg flex items-center justify-center space-x-2">
                  <span>Start Tracking Free</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-all duration-200 font-semibold text-lg">
                  Watch Demo
                </button>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }} className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>10,000+ Active Users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span>Featured on Product Hunt</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-blue-600" />
                  <span>Available Worldwide</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-32 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Everything you need to invest smarter
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Powerful tools and AI-driven insights to help you make informed investment decisions 
                and track your portfolio performance like a pro.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => <motion.div key={feature.title} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: index * 0.1
            }} className="relative group">
                  <div className="h-full p-8 bg-white border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                    <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-32 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                  Take control of your investment journey
                </h2>
                <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                  Stop guessing and start investing with confidence. Our AI-powered platform 
                  helps you understand what's working, what isn't, and why.
                </p>
                
                <div className="mt-8 space-y-4">
                  {benefits.map((benefit, index) => <motion.div key={benefit} initial={{
                  opacity: 0,
                  x: -20
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: index * 0.1
                }} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </motion.div>)}
                </div>

                <div className="mt-10">
                  <button onClick={onGetStarted} className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg">
                    Get Started Today
                  </button>
                </div>
              </div>

              <div className="lg:pl-8">
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900">Portfolio Performance</h3>
                        <span className="text-green-600 font-medium">+12.4%</span>
                      </div>
                      <div className="h-40 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-16 w-16 text-blue-600 opacity-50" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        <div>
                          <p className="text-sm text-gray-500">Total Value</p>
                          <p className="font-semibold text-gray-900">$127,430</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">vs S&P 500</p>
                          <p className="font-semibold text-green-600">+4.2%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-32 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Ready to supercharge your investments?
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of investors who are already using Thesis to make smarter, 
              more informed investment decisions.
            </p>
            
            <div className="mt-10">
              <button onClick={onGetStarted} className="group bg-blue-600 text-white px-10 py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold text-lg flex items-center justify-center space-x-2 mx-auto">
                <span>Start Your Free Trial</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <p className="mt-4 text-sm text-gray-500">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">Thesis</h3>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The intelligent investment tracking platform that helps you make smarter decisions 
                with AI-powered insights and portfolio analysis.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">Features</button></li>
                <li><button className="hover:text-white transition-colors">Pricing</button></li>
                <li><button className="hover:text-white transition-colors">API</button></li>
                <li><button className="hover:text-white transition-colors">Security</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">Help Center</button></li>
                <li><button className="hover:text-white transition-colors">Contact Us</button></li>
                <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-white transition-colors">Terms of Service</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Thesis. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <Globe className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};