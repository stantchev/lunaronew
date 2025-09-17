import { Target, Eye, Heart, Users, Award, Globe } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Trust",
      description: "We build trust through rigorous fact-checking, transparent sourcing, and blockchain-verified authenticity of our content."
    },
    {
      icon: Eye,
      title: "Innovation",
      description: "We harness AI and emerging technologies to enhance journalism while maintaining human insight and editorial judgment."
    },
    {
      icon: Heart,
      title: "Transparency",
      description: "Open data layers show exactly where our information comes from, with clear labeling of sources and methodology."
    },
    {
      icon: Users,
      title: "Participation",
      description: "We foster community engagement through polls, Q&A sessions, moderated discussions, and reader contributions."
    },
    {
      icon: Award,
      title: "Personalization",
      description: "AI-driven recommendations create customized experiences that adapt to individual interests and reading patterns."
    },
    {
      icon: Globe,
      title: "Ethical Standards",
      description: "No clickbait, no misinformation. We practice balanced reporting and sustainable media practices."
    }
  ];

  const team = [
    {
      name: "Milen Stanchev",
	  role: "Founder & CEO",
	  description: "Milen is the Founder and CEO, with over a year of experience in SEO & Marketing."
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container-custom py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Lunaro
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              A hybrid digital media platform that merges journalism, data, and artificial intelligence to create an adaptive ecosystem that evolves with our readers.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-6">
                Lunaro is more than a news website—it is an adaptive ecosystem that evolves with the needs, interests, and behaviors of its readers. We envision a future where journalism, data, and artificial intelligence work seamlessly together.
              </p>
              <p className="text-lg text-gray-600">
                We believe in creating a trustworthy, intelligent media environment where technology amplifies human insight rather than replacing it, empowering people with knowledge they can trust and act upon.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Inform, educate, and inspire through transparency, innovation, and personalized experiences
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Create a trustworthy, intelligent media environment where quality journalism and technology work hand in hand
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Empower people with knowledge through AI-driven personalization and transparent reporting
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Fight misinformation through rigorous fact-checking and blockchain-verified source authentication
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide every decision we make and every story we tell.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card p-8 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon size={32} className="text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg mx-auto">
              <p className="text-lg text-gray-600 mb-6">
                Lunaro was born from a vision of what media could become in the age of artificial intelligence. Founded in 2024, we recognized that the future of journalism lies not in replacing human insight with technology, but in creating a symbiotic relationship between the two.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our name, "Lunaro," draws inspiration from the Moon—symbolizing light in the darkness, exploration, and guidance. Just as the moon provides steady illumination through the night, we aim to be a constant source of reliable information in an increasingly chaotic media landscape.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We began with a hybrid approach: combining traditional journalistic excellence with cutting-edge AI tools for fact-checking, trend analysis, and personalized content delivery. Our platform features five distinct content streams: Lunaro News for breaking stories, Lunaro Deep for investigative pieces, Lunaro Data for visualizations, Lunaro Learn for educational content, and Lunaro Voices for community engagement.
              </p>
              <p className="text-lg text-gray-600">
                Today, we continue to evolve as an adaptive ecosystem, using blockchain technology for source verification, AI assistants to enhance our journalists' capabilities, and sophisticated recommendation engines to ensure every reader receives content that matters to them. We are truly the media of the future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              The passionate individuals behind Lunaro's mission
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-indigo-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}