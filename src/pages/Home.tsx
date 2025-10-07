import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Calendar,
  Trophy,
  Users,
  Shield,
  Target,
  MapPin,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import BAOC_logo from "@/assets/BAOC_logo.png";
import Carousel from "react-material-ui-carousel";
import instructorTeachingImage from "@/assets/Images/DSC_0214-r.jpg";
import DSC_0245_r from "@/assets/Images/DSC_0245-r.jpg";
import DSC_0203_r from "@/assets/Images/DSC_0203-r.jpg";
import DSC_0216_r from "@/assets/Images/DSC_0216-r.jpg";

// Import all images from assets/Images
const imageModules = import.meta.glob(
  "/src/assets/Images/*.{jpg,jpeg,png,JPG}",
  { eager: true, as: "url" }
);

const imageUrls = Object.values(imageModules) as string[];
const imageNames = Object.keys(imageModules).map(
  (path) => path.split("/").pop() || ""
);

const Home = () => {
  const email = "admin@baoc.com";
  const password = "admin123";

  const features = [
    {
      icon: Calendar,
      title: "Event Calendar",
      description:
        "Upcoming orienteering events, competitions, and training courses",
      link: "/calendar",
      image: instructorTeachingImage,
    },
    {
      icon: Trophy,
      title: "Results",
      description: "Historical results from competitions and championships",
      link: "/results",
      image: DSC_0245_r,
    },
    {
      icon: Users,
      title: "BAOC Membership",
      description:
        "Join the British Army Orienteering Club and compete as part of the team",
      link: "/baoc",
      image: DSC_0203_r,
    },
    {
      icon: Shield,
      title: "AOA Information",
      description:
        "Official Army Orienteering Association structure and training",
      link: "/aoa",
      image: DSC_0216_r,
    },
  ];

  const quickStats = [
    { label: "Active Members", value: "500+", icon: Users },
    { label: "Annual Events", value: "20+", icon: Calendar },
    { label: "Training Courses", value: "12+", icon: GraduationCap },
    { label: "Regional Leagues", value: "3", icon: MapPin },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative py-40 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${instructorTeachingImage})`,
        }}
      >
        <div className="relative mx-auto max-w-7xl text-center">
          <div className="flex justify-center mb-8">
            <img
              className="h-24 w-[30vw] rounded-lg  ring-1 overflow-hidden   ring-white/20 shadow-2xl"
              src={BAOC_logo}
              alt="British Army Orienteering Club"
            />
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Army Orienteering
          </h1>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary-dark"
            >
              <Link to="/calendar">
                <Calendar className="mr-2 h-5 w-5" />
                View Events
              </Link>
            </Button>
            <Button asChild variant="hero" size="lg">
              <Link to="/results">
                <Users className="mr-2 h-5 w-5" />
                View Results
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {/* <div className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* About Section */}
      <div className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              About Our Organisation
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              {/* AOA Card */}
              <Card className="shadow-card-custom">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-primary">
                    <Shield className="h-6 w-6" />
                    <span>Army Orienteering Association (AOA)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The official side of Army orienteering, promoting
                    orienteering as military training to the Army community
                    through leagues and championship events.
                  </p>
                  <Button asChild variant="outline" className="mt-4" size="sm">
                    <Link to="/aoa">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* BAOC Card */}
              <Card className="shadow-card-custom">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-primary">
                    <Users className="h-6 w-6" />
                    <span>British Army Orienteering Club (BAOC)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The civilian club side, offering membership benefits, team
                    participation in national events, and maintaining
                    orienteering maps on military training areas.
                  </p>
                  <Button asChild variant="outline" className="mt-4" size="sm">
                    <Link to="/baoc">
                      Join BAOC <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              What You'll Find Here
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need for Army orienteering - from event calendars
              and results to membership information and training opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-military transition-all duration-300 shadow-card-custom overflow-hidden"
              >
                <div
                  className="aspect-w-16 aspect-h-9 relative h-48 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${feature.image})`,
                  }}
                >
                  <div className="absolute bottom-4 left-4">
                    <feature.icon className="h-8 w-8 text-white mb-2" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-primary">
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <Link to={feature.link}>
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Image Slider */}
      <div className="py-16 mx-5 bg-muted/30">
        {(() => {
          const chunkSize = 4;
          const imageChunks = [];
          for (let i = 0; i < imageUrls.length; i += chunkSize) {
            imageChunks.push({
              urls: imageUrls.slice(i, i + chunkSize),
              names: imageNames.slice(i, i + chunkSize),
            });
          }
          return (
            <Carousel
              autoPlay={true}
              interval={3000}
              indicators={false}
              navButtonsAlwaysVisible={true}
            >
              {imageChunks.map((chunk, index) => (
                <div key={index} className="flex space-x-2">
                  {chunk.urls.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={chunk.names[idx]}
                      className="flex-1 h-64 object-cover rounded-lg"
                    />
                  ))}
                </div>
              ))}
            </Carousel>
          );
        })()}
      </div>
    </div>
  );
};

export default Home;
