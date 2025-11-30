import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AIAnalysisResult, DamageType, BusinessSize, VehicleType } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    type: {
      type: Type.STRING,
      enum: [DamageType.HOME, DamageType.BUSINESS, DamageType.VEHICLE],
      description: "The primary category of the damage report."
    },
    homeDetails: {
      type: Type.OBJECT,
      properties: {
        residents: { type: Type.INTEGER, description: "Number of family members." },
        damagePercentage: { type: Type.NUMBER, description: "Estimated percentage of damage (0-100)." },
        memberAges: { 
          type: Type.ARRAY, 
          items: { type: Type.INTEGER },
          description: "Ages of the family members if mentioned."
        }
      },
      nullable: true
    },
    businessDetails: {
      type: Type.OBJECT,
      properties: {
        size: { 
          type: Type.STRING, 
          enum: [BusinessSize.SMALL, BusinessSize.MEDIUM, BusinessSize.LARGE] 
        },
        damagePercentage: { 
          type: Type.NUMBER, 
          description: "Estimated percentage of damage to the business (0-100)." 
        }
      },
      nullable: true
    },
    vehicleDetails: {
      type: Type.OBJECT,
      properties: {
        type: {
          type: Type.STRING,
          enum: [VehicleType.BIKE, VehicleType.CAR, VehicleType.VAN, VehicleType.CAB, VehicleType.LORRY, VehicleType.BUS]
        },
        count: { type: Type.INTEGER }
      },
      nullable: true
    },
    confidence: { type: Type.NUMBER, description: "Confidence score 0-1." }
  },
  required: ["type", "confidence"]
};

export const analyzeDamageDescription = async (text: string): Promise<AIAnalysisResult | null> => {
  if (!text || !apiKey) return null;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following disaster damage report text and extract structured data suitable for a database. 
      Context: Floods and landslides.
      Text: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "You are an expert crisis data analyst. Extract precise data from natural language reports about flood damage."
      }
    });

    const jsonText = response.text;
    if (!jsonText) return null;
    
    return JSON.parse(jsonText) as AIAnalysisResult;
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return null;
  }
};