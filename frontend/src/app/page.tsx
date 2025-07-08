import { PersonalDataForm } from "@/components/sections/personalDataForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconBriefcase, IconCarambola, IconSchool, IconUser } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-md w-full mx-auto">
        <h1 className="text-4xl font-bold mb-2">Gestion du CV</h1>
        <p className="text-gray-400 pb-2">Remplissez les différentes sections de votre CV</p>
        <Tabs defaultValue="user" className="w-[600px]">
          <TabsList className="w-full mb-2">
            <TabsTrigger value="user"><IconUser />Personnel</TabsTrigger>
            <TabsTrigger value="experiences"><IconBriefcase />Expériences</TabsTrigger>
            <TabsTrigger value="formations"><IconSchool />Formations</TabsTrigger>
            <TabsTrigger value="competences"><IconCarambola />Compétences</TabsTrigger>
          </TabsList>
          <TabsContent value="user">
            <div className="flex flex-col gap-4 border border-gray-300 rounded-md p-4">
              
              <PersonalDataForm />
            </div>
          </TabsContent>
          <TabsContent value="experiences">
            <div className="flex flex-col gap-4">
              Expériences
            </div>
          </TabsContent>
          <TabsContent value="formations">
            <div className="flex flex-col gap-4">
              Formations
            </div>
          </TabsContent>
          <TabsContent value="competences">
            <div className="flex flex-col gap-4">
              Compétences
            </div>
          </TabsContent>
        </Tabs>
      </main>

    </div>
  );
}
