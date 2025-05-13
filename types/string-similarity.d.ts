declare module 'string-similarity' {
    export interface BestMatchResult {
      ratings: {
        target: string;
        rating: number;
      }[];
      bestMatch: {
        target: string;
        rating: number;
        targetIndex?: number;
      };
      bestMatchIndex: number;
    }
  
    export function compareTwoStrings(first: string, second: string): number;
    export function findBestMatch(mainString: string, targetStrings: string[]): BestMatchResult;
  }