import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Menu, X, Search, Calendar, Quote, Globe, Leaf, Users, Award } from 'lucide-react'
import './App.css'

// Import images
import mauricePortrait from './assets/images/zBEMICbHBbe9.jpg'
import stockholmConference from './assets/images/hP5R3l7w2Ih5.jpg'
import rioSummit from './assets/images/VYwrlcYGE6lR.jpg'
import sustainableNature from './assets/images/KaBeOTwQxCwO.jpg'
import environmentalLeadership from './assets/images/34K3zqvYDnq0.jpg'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeSection, setActiveSection] = useState('home')

  // Sample speeches data
  const speeches = [
    {
      id: 1,
      title: "1972 Stockholm Conference: Opening Statement",
      date: "June 5, 1972",
      category: "Environment",
      excerpt: "The world desperately needs hope; and we must build on this hope. If we fail, we will add to the growing divisions of this planet.",
      content: "We have made a global decision of immeasurable importance to which this meeting testifies: we have determined that we must control and harness the forces, which we have ourselves created..."
    },
    {
      id: 2,
      title: "Rio Summit Opening Statement",
      date: "June 3, 1992",
      category: "Sustainable Development",
      excerpt: "In 1972, at Stockholm, representatives of 113 of the world's nations took the first steps on a new journey of hope for the future of our 'Only One Earth'.",
      content: "The carrying capacity of our Earth can only sustain present and future generations if it is matched by the caring capacity of its people and its leaders..."
    },
    {
      id: 3,
      title: "The New Global Civilization",
      date: "July 9, 2005",
      category: "Global Governance",
      excerpt: "A new paradigm of cooperative global governance which motivates and mobilises the skills and resources of civil society.",
      content: "The new global civilization is one rooted primarily in materialism and in the commercialization of more and more aspects of human activity..."
    }
  ]

  const achievements = [
    {
      year: "1972",
      title: "Stockholm Conference",
      description: "Secretary-General of the UN Conference on the Human Environment",
      icon: <Globe className="w-6 h-6" />
    },
    {
      year: "1992",
      title: "Rio Earth Summit",
      description: "Secretary-General of the UN Conference on Environment and Development",
      icon: <Leaf className="w-6 h-6" />
    },
    {
      year: "1973-1975",
      title: "UNEP Executive Director",
      description: "First Executive Director of the United Nations Environment Programme",
      icon: <Users className="w-6 h-6" />
    },
    {
      year: "1999",
      title: "Earth Charter Commission",
      description: "Co-Chairman of the Earth Charter Commission",
      icon: <Award className="w-6 h-6" />
    }
  ]

  const filteredSpeeches = speeches.filter(speech =>
    speech.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    speech.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    speech.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'legacy', 'speeches', 'tributes']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gradient">Maurice Strong</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {['Home', 'About', 'Legacy', 'Speeches', 'Tributes'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item.toLowerCase()
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-accent"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-border">
              {['Home', 'About', 'Legacy', 'Speeches', 'Tributes'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground w-full text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${sustainableNature})` }}
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in">
            Maurice Strong
          </h1>
          <p className="text-xl md:text-2xl mb-8 fade-in font-light">
            Environmental Leader & Visionary
          </p>
          <blockquote className="text-2xl md:text-3xl font-serif italic mb-8 fade-in">
            "This is no time for timidity"
          </blockquote>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100 fade-in"
            onClick={() => scrollToSection('about')}
          >
            Explore His Legacy
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gradient">About Maurice Strong</h2>
              <p className="text-lg mb-6 text-muted-foreground leading-relaxed">
                Maurice Frederick Strong (1929-2015) was a Canadian oil and mineral businessman and a diplomat who served as Under-Secretary-General of the United Nations. He was a leading figure in the environmental movement and played a crucial role in organizing the first UN Conference on the Human Environment in Stockholm in 1972 and the Earth Summit in Rio de Janeiro in 1992.
              </p>
              <p className="text-lg mb-6 text-muted-foreground leading-relaxed">
                Strong was instrumental in creating the United Nations Environment Programme (UNEP) and served as its first Executive Director. His vision of sustainable development helped shape global environmental policy and continues to influence environmental thinking today.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Environmental Leader</Badge>
                <Badge variant="secondary">UN Diplomat</Badge>
                <Badge variant="secondary">Business Executive</Badge>
                <Badge variant="secondary">Sustainable Development Pioneer</Badge>
              </div>
            </div>
            <div className="relative">
              <img 
                src={mauricePortrait} 
                alt="Maurice Strong" 
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section id="legacy" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gradient">His Legacy</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Maurice Strong's contributions to environmental policy and sustainable development continue to shape our world today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {achievements.map((achievement, index) => (
              <Card key={index} className="card-hover">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    {achievement.icon}
                  </div>
                  <CardTitle className="text-lg">{achievement.year}</CardTitle>
                  <CardDescription className="font-semibold text-foreground">
                    {achievement.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Stockholm Conference 1972
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src={stockholmConference} 
                  alt="Stockholm Conference 1972" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-muted-foreground">
                  The first major international conference on environmental issues, which laid the foundation for global environmental governance.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5" />
                  Rio Earth Summit 1992
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src={rioSummit} 
                  alt="Rio Earth Summit 1992" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-muted-foreground">
                  The largest gathering of world leaders in history, focusing on sustainable development and environmental protection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Speeches Section */}
      <section id="speeches" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gradient">Speeches & Writings</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore Maurice Strong's influential speeches and writings on environmental policy and sustainable development.
            </p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search speeches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="environment">Environment</TabsTrigger>
              <TabsTrigger value="development">Development</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSpeeches.map((speech) => (
                  <Card key={speech.id} className="card-hover">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{speech.category}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {speech.date}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{speech.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <blockquote className="quote-text mb-4">
                        "{speech.excerpt}"
                      </blockquote>
                      <Button variant="outline" size="sm" className="w-full">
                        Read Full Speech
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Tributes Section */}
      <section id="tributes" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gradient">Tributes & Recognition</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Testimonials and recognition from world leaders and environmental advocates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Quote className="w-5 h-5" />
                  World Leaders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="quote-text mb-4">
                  "Maurice Strong was one of the greatest influences in my life. His vision for sustainable development continues to guide our environmental policies today."
                </blockquote>
                <p className="text-sm text-muted-foreground">— Former Canadian Prime Minister Paul Martin</p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Environmental Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="quote-text mb-4">
                  "Maurice Strong's contribution to the cause of international cooperation and development has been remarkable over the years."
                </blockquote>
                <p className="text-sm text-muted-foreground">— Jan Pronk, Former Dutch Minister</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Maurice Strong</h3>
            <p className="text-lg mb-6">1929 - 2015</p>
            <p className="text-sm opacity-90 max-w-2xl mx-auto">
              "The world desperately needs hope; and we must build on this hope. If we fail, we will add to the growing divisions of this planet."
            </p>
            <div className="mt-8 pt-8 border-t border-primary-foreground/20">
              <p className="text-sm opacity-75">
                © 2024 Maurice Strong Foundation. Site managed by Strong Foundation.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

