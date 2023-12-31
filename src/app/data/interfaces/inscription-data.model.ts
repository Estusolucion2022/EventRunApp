export interface InscriptionData{
    idRace: number,
    race: string,
    idRunner: number,
    idCategory: number,
    category: string,
    registrationDate: Date,
    airlineCityOrigin: string,
    departureDate: Date,
    returnDate: Date,
    idPaymentMethod: number,
    paymentMethod: string,
    proofPayment: string,
    detailsPayment: string,
    tshirtSize: string,
    authorizationListEnrolled: boolean,
    club: string,
    observations: string,
    acceptanceTyC: boolean,
    idUser?: number,
    description?: boolean
}