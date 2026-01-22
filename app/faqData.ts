export interface Question {
  id: string
  Question: string
  Response: string
}

export const Questions: Question[] = [
  {
    id: '1',
    Question: 'What is IEEE Computer Society?',
    Response: 'IEEE Computer Society is a technical society of IEEE dedicated to computing: hardware, software, standards and people.'
  },
  {
    id: '2',
    Question: 'I want to attend your events but I am not at USF',
    Response: 'We welcome all students at our events! Search event you want to visit on Events tab and registrer as a Guest on BullsConnect to visit.'
  }
]
