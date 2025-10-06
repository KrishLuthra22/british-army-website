import { PageHeader } from "@/components/ui/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Target,
  GraduationCap,
  Mail,
  Phone,
  User,
  ExternalLink,
  Trophy,
} from "lucide-react";
import startLineImage from "@/assets/Images/DSC_0305-r.jpg";
import militaryRaceImage from "@/assets/Images/ADSC_0961-r.jpg";

const AOA = () => {
  // Contact data
  const aoaContacts = [
    {
      role: "AOA Chairman",
      name: "Col Richard Matthews",
      unit: "Army HQ",
      email: "chairman@armyorienteering.org.uk",
      phone: "+44 1234 567880",
    },
    {
      role: "Secretary",
      name: "Lt Col Patricia Johnson",
      unit: "Royal Engineers",
      email: "secretary@armyorienteering.org.uk",
      phone: "+44 1234 567881",
    },
    {
      role: "Training Coordinator",
      name: "Maj David Roberts",
      unit: "Royal Military Academy",
      email: "training@armyorienteering.org.uk",
      phone: "+44 1234 567882",
    },
    {
      role: "Courses Officer",
      name: "Capt Helen Clarke",
      unit: "Army Training Centre",
      email: "courses@armyorienteering.org.uk",
      phone: "+44 1234 567883",
    },
  ];

  // League information
  const leagues = [
    {
      name: "Southern League",
      region: "South England",
      contact: "southern@armyorienteering.org.uk",
      fixtures: "6 events per season",
      status: "Active",
    },
    {
      name: "Northern League",
      region: "North England & Scotland",
      contact: "northern@armyorienteering.org.uk",
      fixtures: "5 events per season",
      status: "Active",
    },
    {
      name: "Western League",
      region: "Wales & West England",
      contact: "western@armyorienteering.org.uk",
      fixtures: "4 events per season",
      status: "Active",
    },
  ];

  const contactColumns = [
    { key: "role", header: "Role", className: "font-medium" },
    { key: "name", header: "Name" },
    { key: "unit", header: "Unit" },
    { key: "contact", header: "Contact" },
  ];

  const leagueColumns = [
    { key: "name", header: "League", className: "font-medium" },
    { key: "region", header: "Region" },
    { key: "fixtures", header: "Fixtures" },
    { key: "contact", header: "Contact" },
    { key: "status", header: "Status" },
  ];

  const contactData = aoaContacts.map((contact) => ({
    role: contact.role,
    name: (
      <div className="flex items-center space-x-2">
        <User className="h-4 w-4 text-primary" />
        <span className="font-medium">{contact.name}</span>
      </div>
    ),
    unit: contact.unit,
    contact: (
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <Mail className="h-3 w-3 text-muted-foreground" />
          <a
            href={`mailto:${contact.email}`}
            className="text-sm text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `mailto:${contact.email}`;
            }}
          >
            {contact.email}
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="h-3 w-3 text-muted-foreground" />
          <a href={`tel:${contact.phone}`} className="text-sm text-primary hover:underline">
            {contact.phone}
          </a>
        </div>
      </div>
    ),
  }));

  const leagueData = leagues.map((league) => ({
    name: (
      <div className="flex items-center space-x-2">
        <Shield className="h-4 w-4 text-primary" />
        <span className="font-medium">{league.name}</span>
      </div>
    ),
    region: league.region,
    fixtures: league.fixtures,
    contact: (
      <a
        href={`mailto:${league.contact}`}
        className="text-sm text-primary hover:underline"
      >
        {league.contact}
      </a>
    ),
    status: (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        {league.status}
      </Badge>
    ),
  }));

  return (
    <div>
      <PageHeader
        title="Army Orienteering Association"
        description="Promoting orienteering as essential military training to the Army community"
        backgroundImage={startLineImage}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* AOA Mission with visual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-card-custom">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary">
                <Shield className="h-6 w-6" />
                <span>AOA Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed mb-6">
                The aim of the Army Orienteering Association (AOA) is to promote
                orienteering to the Army community, as an essential military
                skill, through participation in military leagues and
                championship events.
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold">Military Training</h4>
                  <p className="text-sm text-muted-foreground">
                    Essential navigation skills
                  </p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Trophy className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <h4 className="font-semibold">Competitions</h4>
                  <p className="text-sm text-muted-foreground">
                    Championships & leagues
                  </p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <GraduationCap className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold">Coaching</h4>
                  <p className="text-sm text-muted-foreground">
                    Novice to advanced
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="relative overflow-hidden rounded-lg shadow-card-custom">
            <img
              src={militaryRaceImage}
              alt="Military orienteering race"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-white text-xl font-bold mb-2">
                Military Excellence
              </h3>
              <p className="text-white/90 text-sm">
                Promoting orienteering as essential military training
              </p>
            </div>
          </div>
        </div>

        {/* Events and Training */}
        <Card className="mb-8 shadow-card-custom">
          <CardHeader>
            <CardTitle className="text-primary">
              Events and Training Classification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-primary mb-2">
                Individual Military Training (IMT)
              </h4>
              <p>
                These events are open to all service personnel and civilian
                orienteers (by DIO licence) offering courses at three levels of
                technical difficulty: TD3, 4 & 5. Coaching to novices is
                available at most events. Orienteering, training or competitive,
                up to and including Army Team and Individual championships is
                classified as participating in 'Individual Military Training'
                (IMT).
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">
                Category 2 Sport
              </h4>
              <p>
                Army orienteers who compete at higher competitive levels, such
                as Inter Services (Army v Navy v RAF) and UK Armed Forces (UK
                Armed Forces team v Police/University) matches are classified as
                participating in Category 2 Sport.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">
                Core Training Support
              </h4>
              <p>
                Orienteering complements Core Health and Fitness and supports
                Core Combat Skills (Navigation) Individual Training requirements
                (ITRs) for Army personnel. This is a distinct form of navigation
                training, usually taking place in forest or hillside terrain and
                in urban areas where it is possible to navigate freely between
                control points on foot.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Training Courses */}
        <Card className="mb-8 shadow-card-custom">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary">
              <GraduationCap className="h-6 w-6" />
              <span>Training Courses</span>
            </CardTitle>
            <CardDescription>
              Professional orienteering skills development at Longmoor Camp,
              Surrey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-primary">
                    Basic Orienteering Skills
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Introduction to map reading and navigation
                  </p>
                  <Badge variant="outline" className="mt-2">
                    Beginner Level
                  </Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-primary">
                    Intermediate Orienteering Skills
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Advanced navigation techniques
                  </p>
                  <Badge variant="outline" className="mt-2">
                    Intermediate Level
                  </Badge>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-primary">
                    Advanced Orienteering Skills
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Expert navigation and racing tactics
                  </p>
                  <Badge variant="outline" className="mt-2">
                    Advanced Level
                  </Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-primary">
                    Event Planning Course
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Learn to organize orienteering events
                  </p>
                  <Badge variant="outline" className="mt-2">
                    Specialist
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>Booking:</strong> These courses can be booked through
                the ASPT system by all serving military, or direct with the
                Courses officer by non-military personnel. The dates of future
                courses are detailed in the{" "}
                <a href="/calendar" className="text-primary hover:underline">
                  Calendar page
                </a>
                , along with links to the booking emails.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* SharePoint Access */}
        <Card className="mb-8 shadow-card-custom">
          <CardHeader>
            <CardTitle className="text-primary">
              AOA SharePoint Service
            </CardTitle>
            <CardDescription>
              Access for serving military personnel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <h4 className="font-semibold">Military Personnel Access</h4>
                <p className="text-sm text-muted-foreground">
                  Access relevant documents, forms, and military-specific
                  orienteering resources
                </p>
              </div>
              {/* <Button variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                Access SharePoint
              </Button> */}
            </div>
          </CardContent>
        </Card>

        {/* Regional Leagues */}
        <Card className="mb-8 shadow-card-custom">
          <CardHeader>
            <CardTitle className="text-primary">Regional Leagues</CardTitle>
            <CardDescription>
              Military orienteering leagues across the UK
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={leagueColumns} data={leagueData} />
          </CardContent>
        </Card>

        {/* AOA Contacts */}
        <Card className="shadow-card-custom">
          <CardHeader>
            <CardTitle className="text-primary">AOA Contacts</CardTitle>
            <CardDescription>Get in touch with AOA officials</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={contactColumns} data={contactData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AOA;
