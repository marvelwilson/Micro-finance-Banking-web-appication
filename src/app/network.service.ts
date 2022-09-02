import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  // url = 'http://localhost:8000/api/';
  url = 'https://agilfinance.net/service/api/';
   point="https://sms.vanso.com/";

  token: any;
  bearer: any;
  basic: any;

  b: { headers: any; } | undefined;

  constructor(public http: HttpClient) { }

  login(data) {
    return this.http.post(this.url + 'login', data)
  }

  requestHeader() {
    var datas = JSON.parse(localStorage.getItem('userid'));
    this.token = datas.token
    this.bearer = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.token)
      .set('Accept', 'application/json')

    this.b = { headers: this.bearer };
  }
  smsRequestHeader(){
  
    this.basic = new HttpHeaders()
      .set('Authorization', 'Basic TkcuMTAyLjA3MjI6YTlWdnE3RWc=')
      .set('Content-Type', 'aplication/json')
      .set('Access-Control-Allow-Methods', 'POST, GET, DELETE, HEAD, OPTIONS')
      .set('Access-Control-Allow-Origin','https://www.agilfinance.net/home')
      .set('Accept', '*/*')

    this.b = { headers: this.basic };
  }
  
  // <-Admin request functions->
  // customers resgistration api
  RegCusts(data) {
    this.requestHeader()
    return this.http.post(this.url + 'createCusts', data, this.b)

  }

  sms() {
    let data = {
      "sms": {
        "dest": "+2347082575907",
        "src": "AGIL",
        "text": "anim laborum",
        "unicode": false
      },
      "account": {
        "password": "a9Vvq7Eg",
        "systemId": "NG.102.0722"
      }
    }
    this.smsRequestHeader()
    return this.http.post(this.point + 'rest/sms/submit', data, this.b)

  }
  // customers resgistration api
  updateCusts(data) {
    this.requestHeader()
    return this.http.post(this.url + 'updateCusts', data, this.b)

  }

  // staff resgistration api
  RegStaff(data) {
    this.requestHeader()
    return this.http.post(this.url + 'admin/createStaff', data, this.b)
  }

  // staff resgistration api
  Pendings() {
    this.requestHeader()
    return this.http.get(this.url + 'admin/pending', this.b)
  }

  statement(id) {
    this.requestHeader()
    return this.http.get(this.url + 'history/' + id, this.b)
  }
  savings() {
    this.requestHeader()
    return this.http.get(this.url + 'savings', this.b)
  }

  deposit(data) {
    this.requestHeader()
    return this.http.post(this.url + 'deposit', data, this.b)
  }
  withdraw(data) {
    this.requestHeader()
    return this.http.post(this.url + 'withdraw', data, this.b)
  }

  delPendings(id) {
    this.requestHeader()
    return this.http.get(this.url + 'admin/Delpending/' + id, this.b)
  }

  activate(id) {
    this.requestHeader()
    return this.http.get(this.url + 'admin/activate/' + id, this.b)
  }
  // staff edit api
  editStaff(data) {
    this.requestHeader()
    return this.http.post(this.url + 'admin/updateStaff/', data, this.b)
  }

  Search(data) {
    this.requestHeader()
    return this.http.post(this.url + 'admin/search', data, this.b)
  }
  searchPends(data) {
    this.requestHeader()
    return this.http.post(this.url + 'admin/searchPends', data, this.b)
  }
  searchStaff(data) {
    this.requestHeader()
    return this.http.post(this.url + 'admin/searchStaff', data, this.b)
  }

  searchSavings(data) {
    this.requestHeader()
    return this.http.post(this.url + 'searchSavings', data, this.b)
  }

  getdata() {
    this.requestHeader()
    return this.http.get(this.url + 'getAdmin', this.b)

  }
  getCustomers() {
    this.requestHeader()
    return this.http.get(this.url + 'admin/getCustomers', this.b)

  }

  getStaff() {
    this.requestHeader()
    return this.http.get(this.url + 'admin/getStaff', this.b)

  }

  bunb(id) {
    this.requestHeader()
    return this.http.get(this.url + 'admin/bunb/' + id, this.b)

  }

  bunbStaff(id) {
    this.requestHeader()
    return this.http.get(this.url + 'admin/bunbStaff/' + id, this.b)

  }
  delStaff(id) {
    this.requestHeader()
    return this.http.get(this.url + 'admin/delStaff/' + id, this.b)

  }

  checkAvn(data) {
    this.requestHeader()
    return this.http.post(this.url + 'checkAvn', data, this.b)

  }
  // <Esnd Admin request functions>
  searchStatement(data) {
    this.requestHeader()
    return this.http.post(this.url + 'searchStatement', data, this.b)

  }
  transHistory(){
    this.requestHeader()
    return this.http.get(this.url + 'transHistory', this.b)
  }
  searchSStatement(data){
    this.requestHeader()
    return this.http.post(this.url + 'statement',data, this.b)
  }
  addbranch(data){
    this.requestHeader()
    return this.http.post(this.url + 'admin/addbranch',data, this.b)
  }
  getBranches(){
    this.requestHeader()
    return this.http.get(this.url + 'getBranches', this.b)
  }
  delBranch(id){
    this.requestHeader()
    return this.http.get(this.url + 'admin/delBranch/'+id, this.b)
  }
  searchBranches(data){
    this.requestHeader()
    return this.http.post(this.url + 'admin/searchBranches',data, this.b)
  }
  fixed(data){
    this.requestHeader()
    return this.http.post(this.url + 'fixed',data, this.b)
  }
  createFixed(data){
    this.requestHeader()
    return this.http.post(this.url + 'createfixed',data, this.b)
  }
  getFixed(){
    this.requestHeader()
    return this.http.get(this.url + 'getfixed', this.b)
  }
  searchFixed(data){
    this.requestHeader()
    return this.http.post(this.url + 'searchfixed',data, this.b)
  }
  getCFixed(){
    this.requestHeader()
    return this.http.get(this.url + 'getCfixed', this.b)
  }
  searchCFixed(data){
    this.requestHeader()
    return this.http.post(this.url + 'searchCfixed',data, this.b)
  }
  createGroup(data){
    this.requestHeader()
    return this.http.post(this.url + 'createGroup',data, this.b)
  }
  getStf(data){
    this.requestHeader()
    return this.http.post(this.url + 'getstfs',data, this.b)
  }
  getGroups(){
    this.requestHeader()
    return this.http.get(this.url + 'getgroups', this.b)
  }

  getGroupsAmount(){
    this.requestHeader()
    return this.http.get(this.url + 'getGroupsAmount', this.b)
  }
  sendAcc(data){
    this.requestHeader()
    return this.http.post(this.url + 'addMember',data, this.b)
  }
  delAcc(data){
    this.requestHeader()
    return this.http.post(this.url + 'removeMember',data, this.b)
  }
  gwithdraw(data) {
    this.requestHeader()
    return this.http.post(this.url + 'gwithdraw', data, this.b)
  }
  gdeposit(data) {
    this.requestHeader()
    return this.http.post(this.url + 'gdeposit', data, this.b)
  }
  off_gb(data) {
    this.requestHeader()
    return this.http.get(this.url + 'off_gb/'+data, this.b)
  }
  searchGroup(data){
    this.requestHeader()
    return this.http.post(this.url + 'searchGroup',data, this.b)
  }
  getMembers(data) {
    this.requestHeader()
    return this.http.get(this.url + 'getMembers/'+data, this.b)
  }
  getPersonal(data) {
    this.requestHeader()
    return this.http.get(this.url + 'getPersonal/'+data, this.b)
  }
  pdeposit(data) {
    this.requestHeader()
    return this.http.post(this.url + 'pdeposit', data, this.b)
  }
  extend(data) {
    this.requestHeader()
    return this.http.post(this.url + 'extend', data, this.b)
  }
  Pwithdraw(data) {
    this.requestHeader()
    return this.http.post(this.url + 'Pwithdraw', data, this.b)
  }
  reset(data) {
    this.requestHeader()
    return this.http.post(this.url + 'reset', data, this.b)
  }
  o_d(data) {
    this.requestHeader()
    return this.http.post(this.url + 'od', data, this.b)
  }
  SearchPersonal(data){
    this.requestHeader()
    return this.http.post(this.url + 'searchP', data, this.b)
  }
  getVendors(){
    this.requestHeader()
    return this.http.get(this.url + 'admin/getvendors', this.b)
  }
  bills(data){
    this.requestHeader()
    return this.http.get(this.url + 'admin/bills/'+data, this.b)
  }
  FundStaff(data) {
    this.requestHeader()
    return this.http.post(this.url + 'admin/fundVendor', data, this.b)
  }
  DebitStaff(data){
    this.requestHeader()
    return this.http.post(this.url + 'admin/DebitVendor', data, this.b)
  }
  changePass(data){
    this.requestHeader()
    return this.http.post(this.url + 'admin/changepass', data, this.b)
  }
  Vendorstatement(id){
    this.requestHeader()
    return this.http.get(this.url + 'admin/vendorstatement/'+ id, this.b)
  }
  searchDate(data) {
    this.requestHeader()
    return this.http.post(this.url + 'admin/searchDate', data, this.b)

  }
  getExp(id) {
    this.requestHeader()
    return this.http.get(this.url + 'admin/exp/'+ id, this.b)

  }
  SearchVendor(data){
    this.requestHeader()
    return this.http.post(this.url + 'admin/searchVendor', data, this.b)
  }
  W2w(data){
    this.requestHeader()
    return this.http.post(this.url + 'w2w', data, this.b)
  }
  getallExp(){
    this.requestHeader()
    return this.http.get(this.url + 'all_exp', this.b)
  }
  modify(data){
    this.requestHeader()
    return this.http.post(this.url + 'modify',data, this.b)
  }
  expStaff(data){
    this.requestHeader()
    return this.http.get(this.url + 'staffname/'+data, this.b)
  }
  change(data){
    this.requestHeader()
    return this.http.post(this.url + 'change', data, this.b)
  }
 resetExp(data){
    this.requestHeader()
    return this.http.post(this.url + 'resetExp',data, this.b)
  }
  del(data){
    this.requestHeader()
    return this.http.get(this.url + 'delExp/'+data, this.b)
  }
  searchExp(data){
    this.requestHeader()
    return this.http.post(this.url + 'searchExp',data, this.b)
  }
  modifyIn(data){
    this.requestHeader()
    return this.http.post(this.url + 'modifyin',data, this.b)
  }
  getIn(){
    this.requestHeader()
    return this.http.get(this.url + 'getIn', this.b)
  }
  delIn(data){
    this.requestHeader()
    return this.http.get(this.url + 'delIn/'+data, this.b)
  }
  changeIn(data){
    this.requestHeader()
    return this.http.post(this.url + 'changeIn', data, this.b)
  }
 resetIn(data){
    this.requestHeader()
    return this.http.post(this.url + 'resetIn',data, this.b)
  }
  searchIn(data){
    this.requestHeader()
    return this.http.post(this.url + 'searchIn',data, this.b)
  }
  getall_incomes(){
    this.requestHeader()
    return this.http.get(this.url + 'admin/getall_income', this.b);
  }
  getall_expenses(){
    this.requestHeader()
    return this.http.get(this.url + 'admin/getall_expenses', this.b);
  }
  addPro(data){
    this.requestHeader()
    return this.http.post(this.url + 'admin/addPro',data, this.b);
  }
  getProducts(){
    this.requestHeader()
    return this.http.get(this.url + 'admin/getProducts', this.b);
  }
  updatePro(data){
    this.requestHeader()
    return this.http.post(this.url + 'admin/updatePro',data, this.b);
  }
  delPro(data){
    this.requestHeader()
    return this.http.get(this.url + 'admin/delPro/'+data, this.b)
  }



  new_loan(data: FormData) {
    this.requestHeader()
    return this.http.post(this.url + 'admin/new_loan', data, this.b)
  }

  approve_loan(data: FormData){
    this.requestHeader()
    return this.http.post(this.url + 'admin/approve_loan', data, this.b)
  }

  approve_disbursment(data: FormData){
    this.requestHeader()
    return this.http.post(this.url + 'admin/approve_disbursment', data, this.b)
  }

  getPendingLoans(){
    this.requestHeader()
    return this.http.get(this.url + 'admin/getPendingLoans/', this.b)
  }

  getOngoingLoans(){
    this.requestHeader()
    return this.http.get(this.url + 'admin/getOngoingLoans/', this.b)
  }

  getApprovedLoans(){
    this.requestHeader()
    return this.http.get(this.url + 'admin/getApprovedLoans/', this.b)
  }

  getAllLoans(){
    this.requestHeader()
    return this.http.get(this.url + 'admin/getAllLoans/', this.b)
  }

  get_payments(id){
    this.requestHeader()
    return this.http.get(this.url + 'admin/get_payments/'+id, this.b)
  }

  pay_loan(data: FormData){
    this.requestHeader()
    return this.http.post(this.url + 'admin/pay_loan', data, this.b)
  }

  open_account(data: FormData){
    this.requestHeader()
    return this.http.post(this.url + 'admin/open_account', data, this.b)
  }

  getbanks(data){
    this.requestHeader()
    return this.http.get(this.url + 'getbanks/'+data, this.b)
  }

  bank(data){
    this.requestHeader()
    return this.http.post(this.url + 'banks', data, this.b)
  }

  delbank(id){
    this.requestHeader()
    return this.http.get(this.url + 'delbank/'+id, this.b)
  }

  updatebank(data){
    this.requestHeader()
    return this.http.post(this.url + 'updatebank', data, this.b)
  }
  getTrans(datas){
    this.requestHeader()
    return this.http.post(this.url +'getTypes', datas, this.b)
  }
  getThrift(){
    this.requestHeader()
    return this.http.get(this.url +'getThrift', this.b)
  }
  getAmount(id){
    this.requestHeader()
    return this.http.get(this.url +'getAmount/'+id, this.b)
  }
  signout(){
    this.requestHeader()
    return this.http.get(this.url +'signout', this.b)
  }
  remit(data){
    this.requestHeader()
    return this.http.post(this.url +'remit',data, this.b)
  }
  ChangeDate(data){
    this.requestHeader()
    return this.http.post(this.url +'resetDate',data, this.b)
  }
  asset(data){
    this.requestHeader()
    return this.http.post(this.url +'asset',data, this.b)
  }
  delAsset(data){
    this.requestHeader()
    return this.http.post(this.url +'delAsset',data, this.b)
  }
  updateAsset(data){
    this.requestHeader()
    return this.http.post(this.url +'updateAsset',data, this.b)
  }
  accounting(){
    this.requestHeader()
    return this.http.get(this.url +'accounting', this.b)
  }

  revert(data){
    this.requestHeader()
    return this.http.post(this.url +'admin/revert', data, this.b)
  }
}
