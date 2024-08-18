export type Location = {
    lat: string;
    lng: string;
};

export type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Location;
};
