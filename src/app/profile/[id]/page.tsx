"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { getProfile } from "@/lib/localstorage"

export default function ProfilePage() {
  const profile = getProfile() 

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-col md:flex-row items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{profile?.name}</h1>
            <p className="text-xl text-muted-foreground">{profile?.title}</p>
            <p className="text-sm text-muted-foreground">{profile?.location}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Current Roles</h2>
            <div className="space-y-4">
            {profile?.current_employers.map((emp, i) => (
                <div key={i} className="flex items-center gap-4">
                <div className="flex-1">
                <p className="font-medium">{emp.employer_name}</p>
                    <p className="text-sm text-muted-foreground">{emp.employee_title}</p>
                    {emp.employee_description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {emp.employee_description}
                      </p>
                    )}
                </div>
              </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Past Experience</h2>
            <div className="space-y-4">
              {profile?.past_employers.map((emp, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{emp.employer_name}</p>
                    <p className="text-sm text-muted-foreground">{emp.employee_title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <div className="space-y-4">
            {profile?.education_background.map((edu, i) => (
                <div key={i} className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="font-medium">{edu.school_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {edu.degree} • {edu.field_of_study}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
              ))}
            </div>
          </section>

        </CardContent>
      </Card>
    </div>
  )
}