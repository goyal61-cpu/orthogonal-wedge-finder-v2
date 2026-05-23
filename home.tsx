import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, ChevronRight, CheckCircle2, Target, Zap, Server, Activity, ArrowUpRight } from "lucide-react";
import { useGenerateWedge } from "@workspace/api-client-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  productDescription: z.string().min(2, "Required"),
  targetCustomerCategory: z.string().min(2, "Required"),
  geography: z.string().min(2, "Required"),
  goal: z.string().min(2, "Required"),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productDescription: "AI receptionist for specialty clinics",
      targetCustomerCategory: "Healthcare providers",
      geography: "United States",
      goal: "Find the best first customer segment for outbound",
    },
  });

  const mutation = useGenerateWedge();

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({ data: values });
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-mono text-sm">
      {/* Header */}
      <header className="border-b border-border/50 bg-card px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <div className="h-6 w-6 bg-primary rounded-sm flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <h1 className="font-bold tracking-tight text-lg text-foreground">GTM Wedge Finder</h1>
        </div>
        <div className="text-muted-foreground text-xs uppercase tracking-widest flex items-center space-x-2">
          <span>Powered by</span>
          <span className="font-bold text-foreground">Orthogonal</span>
        </div>
      </header>

      {/* Workflow Strip */}
      <div className="border-b border-border/50 bg-muted/20 px-6 py-2 flex items-center space-x-2 overflow-x-auto whitespace-nowrap text-xs text-muted-foreground">
        <span className="flex items-center space-x-2"><Target className="h-3 w-3" /> <span>Product Idea</span></span>
        <ChevronRight className="h-3 w-3" />
        <span className="flex items-center space-x-2"><Server className="h-3 w-3 text-primary/70" /> <span className="text-primary/70">Orthogonal API</span></span>
        <ChevronRight className="h-3 w-3" />
        <span className="flex items-center space-x-2"><Activity className="h-3 w-3" /> <span>Segment Research</span></span>
        <ChevronRight className="h-3 w-3" />
        <span className="flex items-center space-x-2"><CheckCircle2 className="h-3 w-3 text-foreground" /> <span className="text-foreground font-medium">GTM Wedge</span></span>
        <ChevronRight className="h-3 w-3" />
        <span className="flex items-center space-x-2"><ArrowUpRight className="h-3 w-3" /> <span>Outbound Motion</span></span>
      </div>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Column - Input */}
        <div className="w-full md:w-[35%] lg:w-[30%] border-r border-border/50 bg-card/30 p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Input Parameters</h2>
            <p className="text-muted-foreground text-xs">Define your product and bounds to identify the optimal first segment.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="productDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Product Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="AI receptionist for specialty clinics" 
                        className="resize-none h-24 bg-background border-border/50 focus-visible:ring-primary/50" 
                        {...field} 
                        data-testid="input-product-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetCustomerCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Target Customer Category</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Healthcare providers" 
                        className="bg-background border-border/50 focus-visible:ring-primary/50"
                        {...field} 
                        data-testid="input-target-category"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="geography"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Geography</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="United States" 
                        className="bg-background border-border/50 focus-visible:ring-primary/50"
                        {...field} 
                        data-testid="input-geography"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Goal</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Find the best first customer segment for outbound" 
                        className="bg-background border-border/50 focus-visible:ring-primary/50"
                        {...field} 
                        data-testid="input-goal"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm font-semibold tracking-wide uppercase"
                disabled={mutation.isPending}
                data-testid="button-submit"
              >
                {mutation.isPending ? "Processing..." : "Find GTM Wedge"}
                {!mutation.isPending && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </Form>

          {/* Persistent Orthogonal Card */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold flex items-center">
              <Server className="mr-2 h-3 w-3" /> Why Orthogonal Matters
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Without Orthogonal, this workflow would require manually stitching together market research, company search, enrichment, spreadsheets, and outbound tooling. With Orthogonal, an agent can search, enrich, compare, and package the workflow through one API layer.
            </p>
          </div>
        </div>

        {/* Right Column - Output */}
        <div className="w-full md:w-[65%] lg:w-[70%] bg-background p-6 md:p-10 overflow-y-auto relative">
          
          {/* Default Empty State */}
          {!mutation.data && !mutation.isPending && !mutation.isError && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <Target className="h-16 w-16 mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">Awaiting Parameters</h2>
              <p className="text-muted-foreground max-w-sm">Enter your product details on the left to synthesize your optimal GTM wedge.</p>
            </div>
          )}

          {/* Loading State */}
          {mutation.isPending && <LoadingState />}

          {/* Error State */}
          {mutation.isError && (
            <Card className="border-destructive bg-destructive/10">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center">
                  <Activity className="mr-2 h-5 w-5" /> Error Generating Wedge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{mutation.error?.data?.error || mutation.error?.message || "An unexpected error occurred. Please try again."}</p>
              </CardContent>
            </Card>
          )}

          {/* Result State */}
          {mutation.data && !mutation.isPending && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
              
              {/* 1. Recommended First Wedge */}
              <div className="border border-primary/30 bg-primary/5 rounded-md p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] uppercase font-bold px-3 py-1 tracking-wider rounded-bl-md">
                  Optimal Target
                </div>
                <h2 className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Recommended First Wedge</h2>
                <p className="text-2xl md:text-3xl font-bold text-foreground leading-tight" data-testid="text-recommended-wedge">
                  {mutation.data.recommendedWedge}
                </p>
              </div>

              {/* 2. Why This Wedge Wins */}
              <div>
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-3 font-semibold border-b border-border/50 pb-2">Why This Wedge Wins</h3>
                <p className="text-sm leading-relaxed text-foreground/90">{mutation.data.whyThisWedgeWins}</p>
              </div>

              {/* 3. Alternative Segments Considered */}
              <div>
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-3 font-semibold border-b border-border/50 pb-2">Alternative Segments Considered</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mutation.data.alternativeSegments.map((segment, i) => (
                    <li key={i} className="flex items-start bg-card/50 p-3 rounded border border-border/30">
                      <ChevronRight className="h-4 w-4 text-muted-foreground mr-2 shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{segment}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. Segment Scoring Table */}
              <div>
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-3 font-semibold border-b border-border/50 pb-2">Segment Scoring Matrix</h3>
                <div className="rounded-md border border-border/50 overflow-hidden bg-card/30">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[30%]">Segment</TableHead>
                        <TableHead className="text-right text-xs">Pain</TableHead>
                        <TableHead className="text-right text-xs">WTP</TableHead>
                        <TableHead className="text-right text-xs">Reach</TableHead>
                        <TableHead className="text-right text-xs">Cycle</TableHead>
                        <TableHead className="text-right text-xs">Data</TableHead>
                        <TableHead className="text-right font-bold text-primary">Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mutation.data.scoringTable.map((score, i) => (
                        <TableRow key={i} className="group">
                          <TableCell className="font-medium text-xs py-3">{score.segment}</TableCell>
                          <TableCell className="text-right text-muted-foreground">{score.painIntensity}</TableCell>
                          <TableCell className="text-right text-muted-foreground">{score.willingnessToPay}</TableCell>
                          <TableCell className="text-right text-muted-foreground">{score.reachability}</TableCell>
                          <TableCell className="text-right text-muted-foreground">{score.salesCycle}</TableCell>
                          <TableCell className="text-right text-muted-foreground">{score.dataAvailability}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={i === 0 ? "default" : "secondary"} className={i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}>
                              {score.overallScore}/10
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* 5 & 6. Two column layout for Accounts and Persona */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 5. Sample Target Accounts */}
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-3 font-semibold border-b border-border/50 pb-2">Sample Target Accounts</h3>
                  <div className="space-y-2">
                    {mutation.data.sampleTargetAccounts.map((account, i) => (
                      <div key={i} className="flex items-center text-sm p-2 bg-card/30 border border-border/30 rounded font-mono">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                        {account}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Buyer Persona */}
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-3 font-semibold border-b border-border/50 pb-2">Buyer Persona</h3>
                  <Card className="bg-card/50 border-border/50 rounded-md">
                    <CardHeader className="pb-2 pt-4 px-4">
                      <CardTitle className="text-primary text-base">{mutation.data.buyerPersona.title}</CardTitle>
                      <CardDescription className="text-xs mt-1">{mutation.data.buyerPersona.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 space-y-4 text-xs">
                      <div>
                        <strong className="text-muted-foreground block mb-1 uppercase text-[10px] tracking-widest">Pain Points</strong>
                        <ul className="list-disc pl-4 space-y-1 text-foreground/80">
                          {mutation.data.buyerPersona.painPoints.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                      </div>
                      <div>
                        <strong className="text-muted-foreground block mb-1 uppercase text-[10px] tracking-widest">Buying Triggers</strong>
                        <ul className="list-disc pl-4 space-y-1 text-foreground/80">
                          {mutation.data.buyerPersona.buyingTriggers.map((trigger, i) => <li key={i}>{trigger}</li>)}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* 7 & 8. Outbound Strategy */}
              <div>
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-3 font-semibold border-b border-border/50 pb-2">Outbound Motion</h3>
                
                <div className="mb-4">
                  <span className="inline-block text-[10px] uppercase tracking-widest bg-muted text-muted-foreground px-2 py-0.5 rounded mb-2">Strategic Angle</span>
                  <p className="text-sm text-foreground/90 italic pl-3 border-l-2 border-primary/50 py-1">"{mutation.data.firstOutboundAngle}"</p>
                </div>

                <div className="relative mt-6 group">
                  <div className="absolute top-0 right-0 bg-muted text-muted-foreground text-[10px] uppercase font-bold px-3 py-1 tracking-wider rounded-bl-md z-10 border-l border-b border-border/50">
                    Draft Email
                  </div>
                  <pre className="bg-[#0a0a0a] border border-border/80 rounded-md p-6 overflow-x-auto text-xs md:text-sm text-green-400/90 whitespace-pre-wrap font-mono shadow-inner">
                    <code>{mutation.data.draftOutboundEmail}</code>
                  </pre>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-background hover:bg-muted"
                    onClick={() => {
                      navigator.clipboard.writeText(mutation.data.draftOutboundEmail);
                      // In a real app with toaster we'd show a toast here
                    }}
                  >
                    Copy Content
                  </Button>
                </div>
              </div>

              {/* 9. APIs Used */}
              <div>
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-3 font-semibold border-b border-border/50 pb-2">Orthogonal APIs Executed</h3>
                <div className="flex flex-wrap gap-2">
                  {mutation.data.apisUsed.map((api, i) => (
                    <Badge key={i} variant="outline" className="bg-primary/5 border-primary/20 text-primary font-mono text-[10px] uppercase tracking-wider py-1">
                      {api}
                    </Badge>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}

// A more engaging loading state that simulates steps
function LoadingState() {
  const steps = [
    "Establishing secure connection to Orthogonal...",
    "Analyzing product parameters...",
    "Querying global company registry...",
    "Identifying candidate segments...",
    "Scoring alternatives on 5 vectors...",
    "Structuring optimal GTM wedge...",
    "Drafting outbound motion...",
    "Finalizing package..."
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 800 + Math.random() * 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [currentStep, steps.length]);

  return (
    <div className="h-full flex flex-col items-center justify-center font-mono">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
            <Server className="h-12 w-12 text-primary animate-pulse relative z-10" />
          </div>
        </div>
        
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex items-center text-sm transition-all duration-300 ${
                index < currentStep ? "text-primary opacity-100" : 
                index === currentStep ? "text-foreground opacity-100 animate-pulse" : 
                "text-muted-foreground opacity-20"
              }`}
            >
              <div className="w-6 flex-shrink-0">
                {index < currentStep ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : index === currentStep ? (
                  <Activity className="h-4 w-4" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground ml-1.5"></div>
                )}
              </div>
              <span className="tracking-tight">{step}</span>
            </div>
          ))}
        </div>
        
        <div className="pt-6 border-t border-border/50 w-full">
          <div className="h-1 w-full bg-muted overflow-hidden rounded-full">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${Math.max(10, (currentStep / (steps.length - 1)) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}