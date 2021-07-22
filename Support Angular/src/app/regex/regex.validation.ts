export class Regex{
    public name: any = /^[a-zA-Z ñÑáéíóúÁÉÍÓÚ]+$/;
    public surname: any = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
    public password: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    public number: any = /^[0-9]+$/;
}