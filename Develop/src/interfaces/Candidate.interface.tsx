// TODO: Create an interface for the Candidate objects returned by the API

export interface Candidates {
    id: number;
    login: string;
    avatar_url: string;
    name: string | null;
    company: string | null;
    location: string | null;
    email: string | null;
    html_url: string;
}
