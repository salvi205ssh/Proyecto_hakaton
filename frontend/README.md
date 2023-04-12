## Servicios utilizados

getUserLog(username: string, password: string): Observable<User> {
    return this.http.get<User>('http://localhost:3000/users/login/' + username + '/' + password);
}

getCryptos(): Observable<Moneda[]> {
    return this.http.get<Moneda[]>('http://localhost:3000/monedas/all/');
}

InsertWallet(wallet: any): Observable<Wallet> {
    return this.http.post<Wallet>('http://localhost:3000/wallet/add', wallet);
}

InsertUser(user: any): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users/add', user);
}

getAllUserNames(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users/all');
}

getTable(user_id: string): Observable<CryptosUser[]> {
    return this.http.get<CryptosUser[]>('http://localhost:3000/users/getTable/' + user_id);
}

getCoinById(cripto_id: string): Observable<Moneda> {
    return this.http.get<Moneda>('http://localhost:3000/monedas/getCoinById/' + cripto_id);
}

updatestock(cripto_id: string, newStock: number): Observable<any> {
    const url = `http://localhost:3000/monedas/updatestock/${cripto_id}/${newStock}`;
    return this.http.put<any>(url, null);
}

updateDeposit(user_id: string, costeMoneda: number): Observable<any> {
    return this.http.put<any>('http://localhost:3000/users/updateDeposit/', user_id + '/' + costeMoneda );
}

updateDeposit(user_id: string, costeMoneda: number): Observable<any> {
    const url = `http://localhost:3000/users/updateDeposit/${user_id}/${costeMoneda}`;
    return this.http.put<any>(url, null);
}

updateAmount(
    newAmount: number,
    user_id: string,
    cripto_id: string
): Observable<any> {
    const url = `http://localhost:3000/wallet/updateAmount/${newAmount}/${user_id}/${cripto_id}`;
    return this.http.put<any>(url, null);
}
