import { Avatar, AvatarFallback, AvatarImage, Badge, Button } from "@helgadigitals/vera-ui";
import { MapPin, Calendar, Mail, User } from "lucide-react";

export function BasicAvatarExample() {
  return (
    <div className="flex space-x-4">
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      
      <Avatar>
        <AvatarFallback>JS</AvatarFallback>
      </Avatar>
      
      <Avatar>
        <AvatarFallback>BJ</AvatarFallback>
      </Avatar>
    </div>
  );
}

export function AvatarSizesExample() {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-6 w-6">
        <AvatarFallback className="text-xs">U</AvatarFallback>
      </Avatar>
      
      <Avatar className="h-8 w-8">
        <AvatarFallback className="text-sm">U</AvatarFallback>
      </Avatar>
      
      <Avatar className="h-10 w-10">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      
      <Avatar className="h-12 w-12">
        <AvatarFallback className="text-lg">U</AvatarFallback>
      </Avatar>
      
      <Avatar className="h-16 w-16">
        <AvatarFallback className="text-xl">U</AvatarFallback>
      </Avatar>
    </div>
  );
}

export function AvatarFallbackExample() {
  return (
    <div className="flex space-x-4">
      {/* Basic fallback with initials */}
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      
      {/* Another set of initials */}
      <Avatar>
        <AvatarFallback>BK</AvatarFallback>
      </Avatar>
      
      {/* Simple initials */}
      <Avatar>
        <AvatarFallback>JS</AvatarFallback>
      </Avatar>
      
      {/* Custom fallback with icon */}
      <Avatar>
        <AvatarFallback>
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      
      {/* Custom colored fallback */}
      <Avatar>
        <AvatarFallback className="bg-blue-500 text-white">
          AB
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

export function AvatarGroupExample() {
  const users = [
    { name: "John Doe" },
    { name: "Jane Smith" },
    { name: "Bob Johnson" },
    { name: "Alice Williams" },
    { name: "Charlie Brown" },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const displayUsers = users.slice(0, 4);
  const remainingCount = Math.max(0, users.length - 4);

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Overlapping Avatars</h4>
        <div className="flex -space-x-2">
          {displayUsers.map((user, index) => (
            <Avatar key={index} className="border-2 border-white">
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
          ))}
          {remainingCount > 0 && (
            <Avatar className="border-2 border-white">
              <AvatarFallback className="bg-muted">
                +{remainingCount}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Spaced Avatars</h4>
        <div className="flex space-x-2">
          {displayUsers.map((user, index) => (
            <Avatar key={index} className="h-8 w-8">
              <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
          ))}
          {remainingCount > 0 && (
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs font-medium">
              +{remainingCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function AvatarWithImage(){
  return (
    <>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </>
  )
}

export function UserListExample() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "online",
      role: "Admin"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "offline",
      role: "Editor"
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      status: "away",
      role: "User"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center space-x-4 p-4 border rounded-lg">
          <div className="relative">
            <Avatar>
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {user.email}
            </p>
          </div>
          <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
            {user.role}
          </Badge>
        </div>
      ))}
    </div>
  );
}

export function ProfileHeaderExample() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-6">
      <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <Avatar className="h-24 w-24 mx-auto sm:mx-0">
          <AvatarFallback className="text-2xl">SJ</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sarah Johnson</h1>
              <p className="text-gray-600">Senior Frontend Developer</p>
            </div>
            <div className="mt-3 sm:mt-0 flex justify-center sm:justify-end space-x-2">
              <Button variant="outline" size="sm">Message</Button>
              <Button size="sm">Follow</Button>
            </div>
          </div>
          
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-600">
            <div className="flex items-center justify-center sm:justify-start">
              <MapPin className="h-4 w-4 mr-1" />
              San Francisco, CA
            </div>
            <div className="flex items-center justify-center sm:justify-start">
              <Calendar className="h-4 w-4 mr-1" />
              Joined March 2020
            </div>
            <div className="flex items-center justify-center sm:justify-start">
              <Mail className="h-4 w-4 mr-1" />
              sarah@example.com
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Node.js</Badge>
            <Badge variant="secondary">GraphQL</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}