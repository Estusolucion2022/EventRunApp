export interface ReportInscriptionData{
    idRunner: number,
    idRace: number,
    race: string,
    registrationDate: Date,
    documentType: string,
    documentNumber: number,
    firstName: string,
    lastName: string,
    gender: string,
    birthDate: Date,
    age: number,
    bloodType: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    country: string, 
    airlineCityOrigin: string,
    departureDate: Date,
    returnDate: Date,
    paymentMethod: string,
    proofPayment: string,
    detailsPayment: string,
    tshirtSize: string,
    authorizationListEnrolled: boolean,
    club: string,
    observations: string,
    emergencyContactName: string,
    emergencyContactPhone: string,
    category: string,
    categoryRace: string
}