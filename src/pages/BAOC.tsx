import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, MapPin, Mail, Phone, User } from "lucide-react";
import armyCheckpointImage from "@/assets/Images/ADSC_0950-r.jpg";
import controlPunchImage from "@/assets/Images/ADSC_0942-r.jpg";

const BAOC = () => {
  // Contact data
  const contacts = [
    {
      role: "Club Secretary",
      name: "Maj Sarah Thompson",
      unit: "Royal Engineers",
      email: "secretary@baoc.org.uk",
      phone: "+44 1234 567890"
    },
    {
      role: "Membership Secretary", 
      name: "Capt James Wilson",
      unit: "Royal Logistics Corps",
      email: "membership@baoc.org.uk",
      phone: "+44 1234 567891"
    },
    {
      role: "Events Coordinator",
      name: "Lt Emma Davis",
      unit: "Royal Military Police",
      email: "events@baoc.org.uk",
      phone: "+44 1234 567892"
    },
    {
      role: "Training Officer",
      name: "WO1 Michael Brown",
      unit: "Parachute Regiment",
      email: "training@baoc.org.uk",
      phone: "+44 1234 567893"
    }
  ];

  const contactColumns = [
    { key: "role", header: "Role", className: "font-medium" },
    { key: "name", header: "Name" },
    { key: "unit", header: "Unit" },
    { key: "contact", header: "Contact" }
  ];

  const contactData = contacts.map(contact => ({
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
          <a href={`mailto:${contact.email}`} className="text-sm text-primary hover:underline">
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
    )
  }));

  return (
    <div>
      <PageHeader
        title="BAOC - British Army Orienteering Club"
        description="Join the team and become part of Britain's premier military orienteering club"
        backgroundImage={armyCheckpointImage}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Membership benefits with images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-card-custom">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary">
                <Users className="h-6 w-6" />
                <span>What do I get as a BAOC member?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1">1</Badge>
                  <div>
                    <h4 className="font-semibold">Become a member of the team</h4>
                    <p className="text-sm text-muted-foreground">Join a community of dedicated military orienteers</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1">2</Badge>
                  <div>
                    <h4 className="font-semibold">Subsidised entry and team participation</h4>
                    <p className="text-sm text-muted-foreground">Get reduced entry fees and run as part of BAOC teams in relay events</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1">3</Badge>
                  <div>
                    <h4 className="font-semibold">Club strip and identity</h4>
                    <p className="text-sm text-muted-foreground">Represent BAOC in official club colours at events</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1">4</Badge>
                  <div>
                    <h4 className="font-semibold">Expert guidance and support</h4>
                    <p className="text-sm text-muted-foreground">Access plenty of information and advice on anything connected to orienteering</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="relative overflow-hidden rounded-lg shadow-card-custom">
            <img 
              src={controlPunchImage} 
              alt="Orienteering control punch" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-white text-xl font-bold mb-2">Join the Action</h3>
              <p className="text-white/90 text-sm">Experience competitive orienteering at its finest</p>
            </div>
          </div>
        </div>

        {/* What does the club do section */}
        <Card className="mb-8 shadow-card-custom">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary">
              <Trophy className="h-6 w-6" />
              <span>What does the club do?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              When there is demand, we enter teams of all ages in the major national relays: e.g. JK, British Championships, 
              Harvester Relays, as well as the Scottish Relay Championships. We don't normally enter the CompassSport Cup 
              or Trophy, as our membership does not cover the range of age groups required to be competitive.
            </p>
            <p>
              The club is responsible for maintaining orienteering maps of a number of national areas, mainly on military 
              training areas.
            </p>
            <p>
              In recent years we have organised many regional and national events on behalf of a regional association 
              or British Orienteering.
            </p>
          </CardContent>
        </Card>

        {/* Dual membership section */}
        <Card className="mb-8 shadow-card-custom">
          <CardHeader>
            <CardTitle className="text-primary">Can I join another British Orienteering club as well?</CardTitle>
            <CardDescription>Information about dual club membership</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Most certainly: you can be a member of two clubs, as long as one is a Closed Club (with restricted 
              membership such as BAOC, or university club) and the other Open (no membership restrictions).
            </p>
            <p>
              At national level relays you may only compete for one in any one calendar year, but this does not prevent 
              running for one club in relays and another in the CompassSport Cup/Trophy.
            </p>
            <p>
              Membership of a local club is recommended where you wish to participate in local training and social events, 
              as well as competing as a family. Most BAOC members join British Orienteering through BAOC and then also 
              join a local club where they are stationed.
            </p>
            <p>
              If however, you do wish to join BAOC as your Second Club, then contact the club Secretary.
            </p>
          </CardContent>
        </Card>

        {/* Membership fees section */}
        <Card className="mb-8 shadow-card-custom">
          <CardHeader>
            <CardTitle className="text-primary">Membership Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-primary mb-4">BAOC Membership Fee</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>Seniors (21+ years on 31 Dec):</span>
                    <Badge variant="secondary">£5 per year</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>Juniors (20 years or younger on 31 Dec):</span>
                    <Badge variant="secondary">FREE</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-primary mb-4">British Orienteering Membership Fee</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>Seniors (21+ years on 31 Dec):</span>
                    <Badge>£16 per year</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>Young Adult (21 to 25):</span>
                    <Badge>£10 per year</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>Juniors (20 years or younger on 31 Dec):</span>
                    <Badge>£5 per year</Badge>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              There may also be a Regional Association fee depending on the Region you join.
            </p>
          </CardContent>
        </Card>

        {/* Which region section */}
        <Card className="mb-8 shadow-card-custom">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary">
              <MapPin className="h-6 w-6" />
              <span>Which region should I join?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              For most orienteers it's best to join the region in which they live and mostly orienteer, in order to 
              benefit from regional support (particularly for those with young family members) and eligibility for 
              appropriate Regional Championships.
            </p>
          </CardContent>
        </Card>

        {/* Contacts section */}
        <Card className="shadow-card-custom">
          <CardHeader>
            <CardTitle className="text-primary">BAOC Contacts</CardTitle>
            <CardDescription>Get in touch with our club officials</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={contactColumns} data={contactData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BAOC;