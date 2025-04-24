export type Note = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
};

// Dummy data for notes
export const dummyNotes: Note[] = [
  {
    id: "1",
    title: "Meeting Notes: Product Roadmap",
    content:
      "Today we discussed the upcoming product roadmap for Q3 and Q4. Key points included the new feature rollout schedule, resource allocation, and marketing strategy. The team agreed to prioritize the AI-powered recommendations engine and the redesigned dashboard interface. We also discussed potential challenges with the integration of the new payment gateway and decided to allocate additional QA resources to ensure a smooth transition.",
    summary:
      "Q3/Q4 roadmap discussion focusing on feature rollout, resources, and marketing. Priorities: AI recommendations and dashboard redesign. Additional QA for payment gateway integration.",
    createdAt: "2023-09-15T10:30:00Z",
    updatedAt: "2023-09-15T10:30:00Z",
    user_id: "user_123",
  },
  {
    id: "2",
    title: "Research: AI Implementation Strategies",
    content:
      "Researched various approaches to implementing AI in our product. Options include using OpenAI's GPT models, building custom models with TensorFlow, or using a hybrid approach. Each has pros and cons regarding cost, customization, and maintenance requirements. GPT models offer quick implementation but less customization, while custom models require more resources but provide greater control. The hybrid approach might offer the best balance but increases complexity.",
    summary:
      "AI implementation options: OpenAI GPT (quick, less custom), TensorFlow custom models (resource-heavy, more control), or hybrid approach (balanced but complex).",
    createdAt: "2023-09-10T14:45:00Z",
    updatedAt: "2023-09-12T09:15:00Z",
    user_id: "user_123",
  },
  {
    id: "3",
    title: "Project Timeline Updates",
    content:
      "Updated the project timeline to account for recent delays in the API development. The new timeline pushes the beta release by two weeks but maintains the final release date by compressing the QA period slightly. This adjustment requires additional resources during the compressed QA period to ensure quality is not compromised. The team has agreed to this approach, and stakeholders have been notified of the adjusted timeline.",
    summary:
      "Project timeline adjusted: beta release delayed by 2 weeks, final release date maintained by compressing QA period. Additional QA resources required.",
    createdAt: "2023-09-05T11:20:00Z",
    updatedAt: "2023-09-07T16:30:00Z",
    user_id: "user_123",
  },
  {
    id: "4",
    title: "Customer Feedback Analysis",
    content:
      "Analyzed recent customer feedback from the satisfaction survey. Key themes include praise for the intuitive interface and fast response times, but concerns about the limited export options and occasional sync issues. The feedback suggests we should prioritize improving the export functionality and addressing the sync problems in the next update. Additionally, several customers requested a dark mode option, which could be a quick win for improving satisfaction.",
    summary:
      "Customer feedback highlights: Positive - intuitive interface, fast response. Negative - limited exports, sync issues. Recommendations: improve exports, fix sync, add dark mode.",
    createdAt: "2023-08-28T09:00:00Z",
    updatedAt: "2023-08-30T13:45:00Z",
    user_id: "user_123",
  },
  {
    id: "5",
    title: "Ideas for New Features",
    content:
      "Brainstormed potential new features for the Q1 release. Top ideas include collaborative editing capabilities, enhanced data visualization tools, and integration with popular project management software. The collaborative editing feature seems most promising as it addresses a common request from enterprise customers and could help differentiate our product in the market. Initial technical assessment suggests it would require significant backend changes but is feasible within the Q1 timeframe.",
    summary:
      "Q1 feature ideas: collaborative editing (priority, addresses enterprise needs), data visualization tools, and project management integrations. Collaborative editing requires backend changes but feasible for Q1.",
    createdAt: "2023-08-20T15:10:00Z",
    updatedAt: "2023-08-22T10:25:00Z",
    user_id: "user_123",
  },
];
