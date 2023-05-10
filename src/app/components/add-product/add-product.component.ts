import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ScrollService } from 'src/app/services/scroll.service';
import { DatePipe } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { AddProduct } from 'src/app/interfaces/add-product';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { map, finalize, concatMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DATABASE_PROVIDER_NAME } from '@angular/fire/database/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { getDownloadURL, ref, Storage, uploadBytes, } from '@angular/fire/storage';
import * as firebase from 'firebase/compat';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  private basePath = '/images';
  file: File | undefined;
  url: any;
  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  uploadProgress: Observable<number> | undefined;
  downloadURL: Observable<string> | undefined;
  uploadState: Observable<string> | undefined;
  title = "cloudsSorage";
  selectedFile: any = null;
  fb: any;
  filePath: String | undefined;
  getUrl: any;



  productsList: AddProduct[] = [];
  id: string = '';
  name: string = '';
  location: string = '';
  space: string = '';
  price: string = '';
  phone: string = '';
  description: string = '';
  image: string = '';
  category: string = '';


  productObj: AddProduct = {
    id: '',
    name: '',
    location: '',
    space: '',
    price: '',
    phone: '',
    description: '',
    image: '',
    category: '',

  };

  myDate = new Date();


  itemName: string = '';
  inputFlag: string = '';


  data = [


    {
      "id": 1,
      "name": "Afghanistan",
      "dialCode": "+93",
      "isoCode": "AF",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/af.svg"
    },
    {
      "id": 2,
      "name": "Aland Islands",
      "dialCode": "+358",
      "isoCode": "AX",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ax.svg"
    },
    {
      "id": 3,
      "name": "Albania",
      "dialCode": "+355",
      "isoCode": "AL",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/al.svg"
    },
    {
      "id": 4,
      "name": "Algeria",
      "dialCode": "+213",
      "isoCode": "DZ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/dz.svg"
    },
    {
      "id": 5,
      "name": "American Samoa",
      "dialCode": "+1684",
      "isoCode": "AS",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/as.svg"
    },
    {
      "id": 6,
      "name": "Andorra",
      "dialCode": "+376",
      "isoCode": "AD",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ad.svg"
    },
    {
      "id": 7,
      "name": "Angola",
      "dialCode": "+244",
      "isoCode": "AO",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ao.svg"
    },
    {
      "id": 8,
      "name": "Anguilla",
      "dialCode": "+1264",
      "isoCode": "AI",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ai.svg"
    },
    {
      "id": 9,
      "name": "Antarctica",
      "dialCode": "+672",
      "isoCode": "AQ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/aq.svg"
    },
    {
      "id": 10,
      "name": "Antigua and Barbuda",
      "dialCode": "+1268",
      "isoCode": "AG",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ag.svg"
    },
    {
      "id": 11,
      "name": "Argentina",
      "dialCode": "+54",
      "isoCode": "AR",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ar.svg"
    },
    {
      "id": 12,
      "name": "Armenia",
      "dialCode": "+374",
      "isoCode": "AM",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/am.svg"
    },
    {
      "id": 13,
      "name": "Aruba",
      "dialCode": "+297",
      "isoCode": "AW",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/aw.svg"
    },
    {
      "id": 14,
      "name": "Ascension Island",
      "dialCode": "+247",
      "isoCode": "AC",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ac.svg"
    },
    {
      "id": 15,
      "name": "Australia",
      "dialCode": "+61",
      "isoCode": "AU",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/au.svg"
    },
    {
      "id": 16,
      "name": "Austria",
      "dialCode": "+43",
      "isoCode": "AT",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/at.svg"
    },
    {
      "id": 17,
      "name": "Azerbaijan",
      "dialCode": "+994",
      "isoCode": "AZ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/az.svg"
    },
    {
      "id": 18,
      "name": "Bahamas",
      "dialCode": "+1242",
      "isoCode": "BS",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/bs.svg"
    },
    {
      "id": 19,
      "name": "Bahrain",
      "dialCode": "+973",
      "isoCode": "BH",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/bh.svg"
    },
    {
      "id": 20,
      "name": "Bangladesh",
      "dialCode": "+880",
      "isoCode": "BD",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/bd.svg"
    },
    {
      "id": 21,
      "name": "Barbados",
      "dialCode": "+1246",
      "isoCode": "BB",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/bb.svg"
    },
    {
      "id": 22,
      "name": "Belarus",
      "dialCode": "+375",
      "isoCode": "BY",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/by.svg"
    },
    {
      "id": 23,
      "name": "Belgium",
      "dialCode": "+32",
      "isoCode": "BE",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/be.svg"
    },
    {
      "id": 24,
      "name": "Belize",
      "dialCode": "+501",
      "isoCode": "BZ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/bz.svg"
    },
    {
      "id": 25,
      "name": "Benin",
      "dialCode": "+229",
      "isoCode": "BJ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/bj.svg"
    },
    {
      "id": 26,
      "name": "Bermuda",
      "dialCode": "+1441",
      "isoCode": "BM",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/bm.svg"
    },
    {
      "id": 27,
      "name": "Bhutan",
      "dialCode": "+975",
      "isoCode": "BT",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/bt.svg"
    },
    {
      "id": 28,
      "name": "Bolivia",
      "dialCode": "+591",
      "isoCode": "BO",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/bo.svg"
    },
    {
      "id": 29,
      "name": "Bosnia and Herzegovina",
      "dialCode": "+387",
      "isoCode": "BA",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ba.svg"
    },
    {
      "id": 30,
      "name": "Botswana",
      "dialCode": "+267",
      "isoCode": "BW",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/bw.svg"
    },
    {
      "id": 31,
      "name": "Brazil",
      "dialCode": "+55",
      "isoCode": "BR",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/br.svg"
    },
    {
      "id": 32,
      "name": "British Indian Ocean Territory",
      "dialCode": "+246",
      "isoCode": "IO",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/io.svg"
    },
    {
      "id": 33,
      "name": "Brunei Darussalam",
      "dialCode": "+673",
      "isoCode": "BN",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/bn.svg"
    },
    {
      "id": 34,
      "name": "Bulgaria",
      "dialCode": "+359",
      "isoCode": "BG",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/bg.svg"
    },
    {
      "id": 35,
      "name": "Burkina Faso",
      "dialCode": "+226",
      "isoCode": "BF",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/bf.svg"
    },
    {
      "id": 36,
      "name": "Burundi",
      "dialCode": "+257",
      "isoCode": "BI",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/bi.svg"
    },
    {
      "id": 37,
      "name": "Cambodia",
      "dialCode": "+855",
      "isoCode": "KH",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/kh.svg"
    },
    {
      "id": 38,
      "name": "Cameroon",
      "dialCode": "+237",
      "isoCode": "CM",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/cm.svg"
    },
    {
      "id": 39,
      "name": "Canada",
      "dialCode": "+1",
      "isoCode": "CA",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ca.svg"
    },
    {
      "id": 40,
      "name": "Cape Verde",
      "dialCode": "+238",
      "isoCode": "CV",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/cv.svg"
    },
    {
      "id": 41,
      "name": "Cayman Islands",
      "dialCode": "+1345",
      "isoCode": "KY",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ky.svg"
    },
    {
      "id": 42,
      "name": "Central African Republic",
      "dialCode": "+236",
      "isoCode": "CF",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/cf.svg"
    },
    {
      "id": 43,
      "name": "Chad",
      "dialCode": "+235",
      "isoCode": "TD",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/td.svg"
    },
    {
      "id": 44,
      "name": "Chile",
      "dialCode": "+56",
      "isoCode": "CL",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/cl.svg"
    },
    {
      "id": 45,
      "name": "China",
      "dialCode": "+86",
      "isoCode": "CN",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/cn.svg"
    },
    {
      "id": 46,
      "name": "Christmas Island",
      "dialCode": "+61",
      "isoCode": "CX",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/cx.svg"
    },
    {
      "id": 47,
      "name": "Cocos (Keeling) Islands",
      "dialCode": "+61",
      "isoCode": "CC",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/cc.svg"
    },
    {
      "id": 48,
      "name": "Colombia",
      "dialCode": "+57",
      "isoCode": "CO",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/co.svg"
    },
    {
      "id": 49,
      "name": "Comoros",
      "dialCode": "+269",
      "isoCode": "KM",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/km.svg"
    },
    {
      "id": 50,
      "name": "Congo",
      "dialCode": "+242",
      "isoCode": "CG",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/cg.svg"
    },
    {
      "id": 51,
      "name": "Cook Islands",
      "dialCode": "+682",
      "isoCode": "CK",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ck.svg"
    },
    {
      "id": 52,
      "name": "Costa Rica",
      "dialCode": "+506",
      "isoCode": "CR",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/cr.svg"
    },
    {
      "id": 53,
      "name": "Croatia",
      "dialCode": "+385",
      "isoCode": "HR",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/hr.svg"
    },
    {
      "id": 54,
      "name": "Cuba",
      "dialCode": "+53",
      "isoCode": "CU",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/cu.svg"
    },
    {
      "id": 55,
      "name": "Cyprus",
      "dialCode": "+357",
      "isoCode": "CY",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/cy.svg"
    },
    {
      "id": 56,
      "name": "Czech Republic",
      "dialCode": "+420",
      "isoCode": "CZ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/cz.svg"
    },
    {
      "id": 57,
      "name": "Democratic Republic of the Congo",
      "dialCode": "+243",
      "isoCode": "CD",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/cd.svg"
    },
    {
      "id": 58,
      "name": "Denmark",
      "dialCode": "+45",
      "isoCode": "DK",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/dk.svg"
    },
    {
      "id": 59,
      "name": "Djibouti",
      "dialCode": "+253",
      "isoCode": "DJ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/dj.svg"
    },
    {
      "id": 60,
      "name": "Dominica",
      "dialCode": "+1767",
      "isoCode": "DM",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/dm.svg"
    },
    {
      "id": 61,
      "name": "Dominican Republic",
      "dialCode": "+1849",
      "isoCode": "DO",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/do.svg"
    },
    {
      "id": 62,
      "name": "Ecuador",
      "dialCode": "+593",
      "isoCode": "EC",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ec.svg"
    },
    {
      "id": 63,
      "name": "Egypt",
      "dialCode": "+20",
      "isoCode": "EG",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/eg.svg"
    },
    {
      "id": 64,
      "name": "El Salvador",
      "dialCode": "+503",
      "isoCode": "SV",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/sv.svg"
    },
    {
      "id": 65,
      "name": "Equatorial Guinea",
      "dialCode": "+240",
      "isoCode": "GQ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/gq.svg"
    },
    {
      "id": 66,
      "name": "Eritrea",
      "dialCode": "+291",
      "isoCode": "ER",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/er.svg"
    },
    {
      "id": 67,
      "name": "Estonia",
      "dialCode": "+372",
      "isoCode": "EE",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ee.svg"
    },
    {
      "id": 68,
      "name": "Eswatini",
      "dialCode": "+268",
      "isoCode": "SZ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/sz.svg"
    },
    {
      "id": 69,
      "name": "Ethiopia",
      "dialCode": "+251",
      "isoCode": "ET",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/et.svg"
    },
    {
      "id": 70,
      "name": "Falkland Islands (Malvinas)",
      "dialCode": "+500",
      "isoCode": "FK",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/fk.svg"
    },
    {
      "id": 71,
      "name": "Faroe Islands",
      "dialCode": "+298",
      "isoCode": "FO",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/fo.svg"
    },
    {
      "id": 72,
      "name": "Fiji",
      "dialCode": "+679",
      "isoCode": "FJ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/fj.svg"
    },
    {
      "id": 73,
      "name": "Finland",
      "dialCode": "+358",
      "isoCode": "FI",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/fi.svg"
    },
    {
      "id": 74,
      "name": "France",
      "dialCode": "+33",
      "isoCode": "FR",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/fr.svg"
    },
    {
      "id": 75,
      "name": "French Guiana",
      "dialCode": "+594",
      "isoCode": "GF",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/gf.svg"
    },
    {
      "id": 76,
      "name": "French Polynesia",
      "dialCode": "+689",
      "isoCode": "PF",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/pf.svg"
    },
    {
      "id": 77,
      "name": "Gabon",
      "dialCode": "+241",
      "isoCode": "GA",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ga.svg"
    },
    {
      "id": 78,
      "name": "Gambia",
      "dialCode": "+220",
      "isoCode": "GM",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/gm.svg"
    },
    {
      "id": 79,
      "name": "Georgia",
      "dialCode": "+995",
      "isoCode": "GE",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ge.svg"
    },
    {
      "id": 80,
      "name": "Germany",
      "dialCode": "+49",
      "isoCode": "DE",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/de.svg"
    },
    {
      "id": 81,
      "name": "Ghana",
      "dialCode": "+233",
      "isoCode": "GH",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/gh.svg"
    },
    {
      "id": 82,
      "name": "Gibraltar",
      "dialCode": "+350",
      "isoCode": "GI",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/gi.svg"
    },
    {
      "id": 83,
      "name": "Greece",
      "dialCode": "+30",
      "isoCode": "GR",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/gr.svg"
    },
    {
      "id": 84,
      "name": "Greenland",
      "dialCode": "+299",
      "isoCode": "GL",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/gl.svg"
    },
    {
      "id": 85,
      "name": "Grenada",
      "dialCode": "+1473",
      "isoCode": "GD",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/gd.svg"
    },
    {
      "id": 86,
      "name": "Guadeloupe",
      "dialCode": "+590",
      "isoCode": "GP",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/gp.svg"
    },
    {
      "id": 87,
      "name": "Guam",
      "dialCode": "+1671",
      "isoCode": "GU",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/gu.svg"
    },
    {
      "id": 88,
      "name": "Guatemala",
      "dialCode": "+502",
      "isoCode": "GT",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/gt.svg"
    },
    {
      "id": 89,
      "name": "Guernsey",
      "dialCode": "+44",
      "isoCode": "GG",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/gg.svg"
    },
    {
      "id": 90,
      "name": "Guinea",
      "dialCode": "+224",
      "isoCode": "GN",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/gn.svg"
    },
    {
      "id": 91,
      "name": "Guinea-Bissau",
      "dialCode": "+245",
      "isoCode": "GW",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/gw.svg"
    },
    {
      "id": 92,
      "name": "Guyana",
      "dialCode": "+592",
      "isoCode": "GY",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/gy.svg"
    },
    {
      "id": 93,
      "name": "Haiti",
      "dialCode": "+509",
      "isoCode": "HT",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ht.svg"
    },
    {
      "id": 94,
      "name": "Holy See (Vatican City State)",
      "dialCode": "+379",
      "isoCode": "VA",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/va.svg"
    },
    {
      "id": 95,
      "name": "Honduras",
      "dialCode": "+504",
      "isoCode": "HN",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/hn.svg"
    },
    {
      "id": 96,
      "name": "Hong Kong",
      "dialCode": "+852",
      "isoCode": "HK",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/hk.svg"
    },
    {
      "id": 97,
      "name": "Hungary",
      "dialCode": "+36",
      "isoCode": "HU",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/hu.svg"
    },
    {
      "id": 98,
      "name": "Iceland",
      "dialCode": "+354",
      "isoCode": "IS",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/is.svg"
    },
    {
      "id": 99,
      "name": "India",
      "dialCode": "+91",
      "isoCode": "IN",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/in.svg"
    },
    {
      "id": 100,
      "name": "Indonesia",
      "dialCode": "+62",
      "isoCode": "ID",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/id.svg"
    },
    {
      "id": 101,
      "name": "Iran",
      "dialCode": "+98",
      "isoCode": "IR",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ir.svg"
    },
    {
      "id": 102,
      "name": "Iraq",
      "dialCode": "+964",
      "isoCode": "IQ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/iq.svg"
    },
    {
      "id": 103,
      "name": "Ireland",
      "dialCode": "+353",
      "isoCode": "IE",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ie.svg"
    },
    {
      "id": 104,
      "name": "Isle of Man",
      "dialCode": "+44",
      "isoCode": "IM",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/im.svg"
    },
    {
      "id": 105,
      "name": "Italy",
      "dialCode": "+39",
      "isoCode": "IT",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/it.svg"
    },
    {
      "id": 106,
      "name": "Ivory Coast / Cote d'Ivoire",
      "dialCode": "+225",
      "isoCode": "CI",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ci.svg"
    },
    {
      "id": 107,
      "name": "Jamaica",
      "dialCode": "+1876",
      "isoCode": "JM",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/jm.svg"
    },
    {
      "id": 108,
      "name": "Japan",
      "dialCode": "+81",
      "isoCode": "JP",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/jp.svg"
    },
    {
      "id": 109,
      "name": "Jersey",
      "dialCode": "+44",
      "isoCode": "JE",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/je.svg"
    },
    {
      "id": 110,
      "name": "Jordan",
      "dialCode": "+962",
      "isoCode": "JO",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/jo.svg"
    },
    {
      "id": 111,
      "name": "Kazakhstan",
      "dialCode": "+77",
      "isoCode": "KZ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/kz.svg"
    },
    {
      "id": 112,
      "name": "Kenya",
      "dialCode": "+254",
      "isoCode": "KE",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ke.svg"
    },
    {
      "id": 113,
      "name": "Kiribati",
      "dialCode": "+686",
      "isoCode": "KI",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ki.svg"
    },
    {
      "id": 114,
      "name": "Korea, Democratic People's Republic of Korea",
      "dialCode": "+850",
      "isoCode": "KP",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/kp.svg"
    },
    {
      "id": 115,
      "name": "Korea, Republic of South Korea",
      "dialCode": "+82",
      "isoCode": "KR",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/kr.svg"
    },
    {
      "id": 116,
      "name": "Kosovo",
      "dialCode": "+383",
      "isoCode": "XK",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/xk.svg"
    },
    {
      "id": 117,
      "name": "Kuwait",
      "dialCode": "+965",
      "isoCode": "KW",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/kw.svg"
    },
    {
      "id": 118,
      "name": "Kyrgyzstan",
      "dialCode": "+996",
      "isoCode": "KG",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/kg.svg"
    },
    {
      "id": 119,
      "name": "Laos",
      "dialCode": "+856",
      "isoCode": "LA",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/la.svg"
    },
    {
      "id": 120,
      "name": "Latvia",
      "dialCode": "+371",
      "isoCode": "LV",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/lv.svg"
    },
    {
      "id": 121,
      "name": "Lebanon",
      "dialCode": "+961",
      "isoCode": "LB",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/lb.svg"
    },
    {
      "id": 122,
      "name": "Lesotho",
      "dialCode": "+266",
      "isoCode": "LS",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ls.svg"
    },
    {
      "id": 123,
      "name": "Liberia",
      "dialCode": "+231",
      "isoCode": "LR",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/lr.svg"
    },
    {
      "id": 124,
      "name": "Libya",
      "dialCode": "+218",
      "isoCode": "LY",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ly.svg"
    },
    {
      "id": 125,
      "name": "Liechtenstein",
      "dialCode": "+423",
      "isoCode": "LI",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/li.svg"
    },
    {
      "id": 126,
      "name": "Lithuania",
      "dialCode": "+370",
      "isoCode": "LT",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/lt.svg"
    },
    {
      "id": 127,
      "name": "Luxembourg",
      "dialCode": "+352",
      "isoCode": "LU",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/lu.svg"
    },
    {
      "id": 128,
      "name": "Macau",
      "dialCode": "+853",
      "isoCode": "MO",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/mo.svg"
    },
    {
      "id": 129,
      "name": "Madagascar",
      "dialCode": "+261",
      "isoCode": "MG",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/mg.svg"
    },
    {
      "id": 130,
      "name": "Malawi",
      "dialCode": "+265",
      "isoCode": "MW",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/mw.svg"
    },
    {
      "id": 131,
      "name": "Malaysia",
      "dialCode": "+60",
      "isoCode": "MY",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/my.svg"
    },
    {
      "id": 132,
      "name": "Maldives",
      "dialCode": "+960",
      "isoCode": "MV",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/mv.svg"
    },
    {
      "id": 133,
      "name": "Mali",
      "dialCode": "+223",
      "isoCode": "ML",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ml.svg"
    },
    {
      "id": 134,
      "name": "Malta",
      "dialCode": "+356",
      "isoCode": "MT",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/mt.svg"
    },
    {
      "id": 135,
      "name": "Marshall Islands",
      "dialCode": "+692",
      "isoCode": "MH",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/mh.svg"
    },
    {
      "id": 136,
      "name": "Martinique",
      "dialCode": "+596",
      "isoCode": "MQ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/mq.svg"
    },
    {
      "id": 137,
      "name": "Mauritania",
      "dialCode": "+222",
      "isoCode": "MR",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/mr.svg"
    },
    {
      "id": 138,
      "name": "Mauritius",
      "dialCode": "+230",
      "isoCode": "MU",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/mu.svg"
    },
    {
      "id": 139,
      "name": "Mayotte",
      "dialCode": "+262",
      "isoCode": "YT",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/yt.svg"
    },
    {
      "id": 140,
      "name": "Mexico",
      "dialCode": "+52",
      "isoCode": "MX",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/mx.svg"
    },
    {
      "id": 141,
      "name": "Micronesia, Federated States of Micronesia",
      "dialCode": "+691",
      "isoCode": "FM",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/fm.svg"
    },
    {
      "id": 142,
      "name": "Moldova",
      "dialCode": "+373",
      "isoCode": "MD",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/md.svg"
    },
    {
      "id": 143,
      "name": "Monaco",
      "dialCode": "+377",
      "isoCode": "MC",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/mc.svg"
    },
    {
      "id": 144,
      "name": "Mongolia",
      "dialCode": "+976",
      "isoCode": "MN",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/mn.svg"
    },
    {
      "id": 145,
      "name": "Montenegro",
      "dialCode": "+382",
      "isoCode": "ME",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/me.svg"
    },
    {
      "id": 146,
      "name": "Montserrat",
      "dialCode": "+1664",
      "isoCode": "MS",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ms.svg"
    },
    {
      "id": 147,
      "name": "Morocco",
      "dialCode": "+212",
      "isoCode": "MA",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ma.svg"
    },
    {
      "id": 148,
      "name": "Mozambique",
      "dialCode": "+258",
      "isoCode": "MZ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/mz.svg"
    },
    {
      "id": 149,
      "name": "Myanmar",
      "dialCode": "+95",
      "isoCode": "MM",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/mm.svg"
    },
    {
      "id": 150,
      "name": "Namibia",
      "dialCode": "+264",
      "isoCode": "NA",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/na.svg"
    },
    {
      "id": 151,
      "name": "Nauru",
      "dialCode": "+674",
      "isoCode": "NR",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/nr.svg"
    },
    {
      "id": 152,
      "name": "Nepal",
      "dialCode": "+977",
      "isoCode": "NP",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/np.svg"
    },
    {
      "id": 153,
      "name": "Netherlands",
      "dialCode": "+31",
      "isoCode": "NL",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/nl.svg"
    },
    {
      "id": 154,
      "name": "Netherlands Antilles",
      "dialCode": "+599",
      "isoCode": "AN",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/an.svg"
    },
    {
      "id": 155,
      "name": "New Caledonia",
      "dialCode": "+687",
      "isoCode": "NC",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/nc.svg"
    },
    {
      "id": 156,
      "name": "New Zealand",
      "dialCode": "+64",
      "isoCode": "NZ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/nz.svg"
    },
    {
      "id": 157,
      "name": "Nicaragua",
      "dialCode": "+505",
      "isoCode": "NI",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ni.svg"
    },
    {
      "id": 158,
      "name": "Niger",
      "dialCode": "+227",
      "isoCode": "NE",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ne.svg"
    },
    {
      "id": 159,
      "name": "Nigeria",
      "dialCode": "+234",
      "isoCode": "NG",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ng.svg"
    },
    {
      "id": 160,
      "name": "Niue",
      "dialCode": "+683",
      "isoCode": "NU",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/nu.svg"
    },
    {
      "id": 161,
      "name": "Norfolk Island",
      "dialCode": "+672",
      "isoCode": "NF",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/nf.svg"
    },
    {
      "id": 162,
      "name": "North Macedonia",
      "dialCode": "+389",
      "isoCode": "MK",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/mk.svg"
    },
    {
      "id": 163,
      "name": "Northern Mariana Islands",
      "dialCode": "+1670",
      "isoCode": "MP",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/mp.svg"
    },
    {
      "id": 164,
      "name": "Norway",
      "dialCode": "+47",
      "isoCode": "NO",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/no.svg"
    },
    {
      "id": 165,
      "name": "Oman",
      "dialCode": "+968",
      "isoCode": "OM",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/om.svg"
    },
    {
      "id": 166,
      "name": "Pakistan",
      "dialCode": "+92",
      "isoCode": "PK",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/pk.svg"
    },
    {
      "id": 167,
      "name": "Palau",
      "dialCode": "+680",
      "isoCode": "PW",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/pw.svg"
    },
    {
      "id": 168,
      "name": "Palestine",
      "dialCode": "+970",
      "isoCode": "PS",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ps.svg"
    },
    {
      "id": 169,
      "name": "Panama",
      "dialCode": "+507",
      "isoCode": "PA",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/pa.svg"
    },
    {
      "id": 170,
      "name": "Papua New Guinea",
      "dialCode": "+675",
      "isoCode": "PG",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/pg.svg"
    },
    {
      "id": 171,
      "name": "Paraguay",
      "dialCode": "+595",
      "isoCode": "PY",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/py.svg"
    },
    {
      "id": 172,
      "name": "Peru",
      "dialCode": "+51",
      "isoCode": "PE",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/pe.svg"
    },
    {
      "id": 173,
      "name": "Philippines",
      "dialCode": "+63",
      "isoCode": "PH",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ph.svg"
    },
    {
      "id": 174,
      "name": "Pitcairn",
      "dialCode": "+872",
      "isoCode": "PN",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/pn.svg"
    },
    {
      "id": 175,
      "name": "Poland",
      "dialCode": "+48",
      "isoCode": "PL",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/pl.svg"
    },
    {
      "id": 176,
      "name": "Portugal",
      "dialCode": "+351",
      "isoCode": "PT",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/pt.svg"
    },
    {
      "id": 177,
      "name": "Puerto Rico",
      "dialCode": "+1939",
      "isoCode": "PR",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/pr.svg"
    },
    {
      "id": 178,
      "name": "Qatar",
      "dialCode": "+974",
      "isoCode": "QA",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/qa.svg"
    },
    {
      "id": 179,
      "name": "Reunion",
      "dialCode": "+262",
      "isoCode": "RE",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/re.svg"
    },
    {
      "id": 180,
      "name": "Romania",
      "dialCode": "+40",
      "isoCode": "RO",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ro.svg"
    },
    {
      "id": 181,
      "name": "Russia",
      "dialCode": "+7",
      "isoCode": "RU",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ru.svg"
    },
    {
      "id": 182,
      "name": "Rwanda",
      "dialCode": "+250",
      "isoCode": "RW",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/rw.svg"
    },
    {
      "id": 183,
      "name": "Saint Barthelemy",
      "dialCode": "+590",
      "isoCode": "BL",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/bl.svg"
    },
    {
      "id": 184,
      "name": "Saint Helena, Ascension and Tristan Da Cunha",
      "dialCode": "+290",
      "isoCode": "SH",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/sh.svg"
    },
    {
      "id": 185,
      "name": "Saint Kitts and Nevis",
      "dialCode": "+1869",
      "isoCode": "KN",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/kn.svg"
    },
    {
      "id": 186,
      "name": "Saint Lucia",
      "dialCode": "+1758",
      "isoCode": "LC",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/lc.svg"
    },
    {
      "id": 187,
      "name": "Saint Martin",
      "dialCode": "+590",
      "isoCode": "MF",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/mf.svg"
    },
    {
      "id": 188,
      "name": "Saint Pierre and Miquelon",
      "dialCode": "+508",
      "isoCode": "PM",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/pm.svg"
    },
    {
      "id": 189,
      "name": "Saint Vincent and the Grenadines",
      "dialCode": "+1784",
      "isoCode": "VC",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/vc.svg"
    },
    {
      "id": 190,
      "name": "Samoa",
      "dialCode": "+685",
      "isoCode": "WS",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ws.svg"
    },
    {
      "id": 191,
      "name": "San Marino",
      "dialCode": "+378",
      "isoCode": "SM",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/sm.svg"
    },
    {
      "id": 192,
      "name": "Sao Tome and Principe",
      "dialCode": "+239",
      "isoCode": "ST",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/st.svg"
    },
    {
      "id": 193,
      "name": "Saudi Arabia",
      "dialCode": "+966",
      "isoCode": "SA",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/sa.svg"
    },
    {
      "id": 194,
      "name": "Senegal",
      "dialCode": "+221",
      "isoCode": "SN",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/sn.svg"
    },
    {
      "id": 195,
      "name": "Serbia",
      "dialCode": "+381",
      "isoCode": "RS",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/rs.svg"
    },
    {
      "id": 196,
      "name": "Seychelles",
      "dialCode": "+248",
      "isoCode": "SC",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/sc.svg"
    },
    {
      "id": 197,
      "name": "Sierra Leone",
      "dialCode": "+232",
      "isoCode": "SL",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/sl.svg"
    },
    {
      "id": 198,
      "name": "Singapore",
      "dialCode": "+65",
      "isoCode": "SG",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/sg.svg"
    },
    {
      "id": 199,
      "name": "Sint Maarten",
      "dialCode": "+1721",
      "isoCode": "SX",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/sx.svg"
    },
    {
      "id": 200,
      "name": "Slovakia",
      "dialCode": "+421",
      "isoCode": "SK",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/sk.svg"
    },
    {
      "id": 201,
      "name": "Slovenia",
      "dialCode": "+386",
      "isoCode": "SI",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/si.svg"
    },
    {
      "id": 202,
      "name": "Solomon Islands",
      "dialCode": "+677",
      "isoCode": "SB",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/sb.svg"
    },
    {
      "id": 203,
      "name": "Somalia",
      "dialCode": "+252",
      "isoCode": "SO",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/so.svg"
    },
    {
      "id": 204,
      "name": "South Africa",
      "dialCode": "+27",
      "isoCode": "ZA",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/za.svg"
    },
    {
      "id": 205,
      "name": "South Georgia and the South Sandwich Islands",
      "dialCode": "+500",
      "isoCode": "GS",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/gs.svg"
    },
    {
      "id": 206,
      "name": "South Sudan",
      "dialCode": "+211",
      "isoCode": "SS",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ss.svg"
    },
    {
      "id": 207,
      "name": "Spain",
      "dialCode": "+34",
      "isoCode": "ES",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/es.svg"
    },
    {
      "id": 208,
      "name": "Sri Lanka",
      "dialCode": "+94",
      "isoCode": "LK",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/lk.svg"
    },
    {
      "id": 209,
      "name": "Sudan",
      "dialCode": "+249",
      "isoCode": "SD",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/sd.svg"
    },
    {
      "id": 210,
      "name": "Suriname",
      "dialCode": "+597",
      "isoCode": "SR",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/sr.svg"
    },
    {
      "id": 211,
      "name": "Svalbard and Jan Mayen",
      "dialCode": "+47",
      "isoCode": "SJ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/sj.svg"
    },
    {
      "id": 212,
      "name": "Sweden",
      "dialCode": "+46",
      "isoCode": "SE",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/se.svg"
    },
    {
      "id": 213,
      "name": "Switzerland",
      "dialCode": "+41",
      "isoCode": "CH",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ch.svg"
    },
    {
      "id": 214,
      "name": "Syrian Arab Republic",
      "dialCode": "+963",
      "isoCode": "SY",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/sy.svg"
    },
    {
      "id": 215,
      "name": "Taiwan",
      "dialCode": "+886",
      "isoCode": "TW",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/tw.svg"
    },
    {
      "id": 216,
      "name": "Tajikistan",
      "dialCode": "+992",
      "isoCode": "TJ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/tj.svg"
    },
    {
      "id": 217,
      "name": "Tanzania, United Republic of Tanzania",
      "dialCode": "+255",
      "isoCode": "TZ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/tz.svg"
    },
    {
      "id": 218,
      "name": "Thailand",
      "dialCode": "+66",
      "isoCode": "TH",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/th.svg"
    },
    {
      "id": 219,
      "name": "Timor-Leste",
      "dialCode": "+670",
      "isoCode": "TL",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/tl.svg"
    },
    {
      "id": 220,
      "name": "Togo",
      "dialCode": "+228",
      "isoCode": "TG",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/tg.svg"
    },
    {
      "id": 221,
      "name": "Tokelau",
      "dialCode": "+690",
      "isoCode": "TK",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/tk.svg"
    },
    {
      "id": 222,
      "name": "Tonga",
      "dialCode": "+676",
      "isoCode": "TO",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/to.svg"
    },
    {
      "id": 223,
      "name": "Trinidad and Tobago",
      "dialCode": "+1868",
      "isoCode": "TT",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/tt.svg"
    },
    {
      "id": 224,
      "name": "Tunisia",
      "dialCode": "+216",
      "isoCode": "TN",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/tn.svg"
    },
    {
      "id": 225,
      "name": "Turkey",
      "dialCode": "+90",
      "isoCode": "TR",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/tr.svg"
    },
    {
      "id": 226,
      "name": "Turkmenistan",
      "dialCode": "+993",
      "isoCode": "TM",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/tm.svg"
    },
    {
      "id": 227,
      "name": "Turks and Caicos Islands",
      "dialCode": "+1649",
      "isoCode": "TC",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/tc.svg"
    },
    {
      "id": 228,
      "name": "Tuvalu",
      "dialCode": "+688",
      "isoCode": "TV",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/tv.svg"
    },
    {
      "id": 229,
      "name": "Uganda",
      "dialCode": "+256",
      "isoCode": "UG",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ug.svg"
    },
    {
      "id": 230,
      "name": "Ukraine",
      "dialCode": "+380",
      "isoCode": "UA",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ua.svg"
    },
    {
      "id": 231,
      "name": "United Arab Emirates",
      "dialCode": "+971",
      "isoCode": "AE",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ae.svg"
    },
    {
      "id": 232,
      "name": "United Kingdom",
      "dialCode": "+44",
      "isoCode": "GB",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/gb.svg"
    },
    {
      "id": 233,
      "name": "United States",
      "dialCode": "+1",
      "isoCode": "US",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/us.svg"
    },
    {
      "id": 234,
      "name": "United States Minor Outlying Islands",
      "dialCode": "+246",
      "isoCode": "UMI",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/umi.svg"
    },
    {
      "id": 235,
      "name": "Uruguay",
      "dialCode": "+598",
      "isoCode": "UY",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/uy.svg"
    },
    {
      "id": 236,
      "name": "Uzbekistan",
      "dialCode": "+998",
      "isoCode": "UZ",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/uz.svg"
    },
    {
      "id": 237,
      "name": "Vanuatu",
      "dialCode": "+678",
      "isoCode": "VU",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/vu.svg"
    },
    {
      "id": 238,
      "name": "Venezuela, Bolivarian Republic of Venezuela",
      "dialCode": "+58",
      "isoCode": "VE",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ve.svg"
    },
    {
      "id": 239,
      "name": "Vietnam",
      "dialCode": "+84",
      "isoCode": "VN",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/vn.svg"
    },
    {
      "id": 240,
      "name": "Virgin Islands, British",
      "dialCode": "+1284",
      "isoCode": "VG",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/vg.svg"
    },
    {
      "id": 241,
      "name": "Virgin Islands, U.S.",
      "dialCode": "+1340",
      "isoCode": "VI",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/vi.svg"
    },
    {
      "id": 242,
      "name": "Wallis and Futuna",
      "dialCode": "+681",
      "isoCode": "WF",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/wf.svg"
    },
    {
      "id": 243,
      "name": "Yemen",
      "dialCode": "+967",
      "isoCode": "YE",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ye.svg"
    },
    {
      "id": 244,
      "name": "Zambia",
      "dialCode": "+260",
      "isoCode": "ZM",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/zm.svg"
    },
    {
      "id": 245,
      "name": "Zimbabwe",
      "dialCode": "+263",
      "isoCode": "ZW",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/zw.svg"
    }

  ];

  AddProductForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    space: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required])

  });


  constructor(private toast: HotToastService, private router: Router, public scroll: ScrollService,
    private datas: DataService, private fs: AngularFirestore, private afStorage: AngularFireStorage,
    private _sanitizer: DomSanitizer, private authService: AuthService,
    private imageUploadService: UploadImageService, private storage: Storage) { }


  ngOnInit(): void { }

  show(item: any): void {
    console.log(item);

  }



  showItem(item: any) {
    this.itemName = item.name;
    this.inputFlag = item.flag;
    this.scroll.hide();
    this.location = item.name;
  }


  showscrollbar() {
    this.scroll.show();
  }

  resetForm() {
    this.id = '';
    this.name = '';
    this.location = '';
    this.space = '';
    this.price = '';
    this.phone = '';
    this.description = '';
    this.image = '';
    this.category = '';
  }


  add() {
    if (this.category == '' || this.name == '' || this.location == '' || this.image == '' || this.space == '' || this.price == '' || this.phone == '' || this.description == '') {
      alert('Fill all input fields');
      return;
    }

    this.productObj.id = '';
    this.productObj.name = this.name;
    this.productObj.location = this.location;
    this.productObj.space = this.space;
    this.productObj.price = this.price;
    this.productObj.phone = this.phone;
    this.productObj.description = this.description;
    this.productObj.image = this.image;
    this.productObj.category = this.category;


    this.datas.addProducts(this.productObj);
    console.log(this.productObj);
    //this.pop.hide();
    this.resetForm();

    console.log('image', this.AddProductForm.value.image);


  }


  /* uploadImage($event: any) {
 
     const id = Math.random().toString(36).substring(2)
     this.ref = this.afStorage.ref(id)
     this.task = this.ref.put($event.target.files[0])
     console.log(this.task)
     this.task.then((data) => {
       data.ref.getDownloadURL().then(url => {
         this.fs.collection("products")
       })
     })
   }*/

  /* readUrl(event: any) {
     let url: any
     if (event.target.files && event.target.files[0]) {
       var reader = new FileReader();
 
       reader.onload = (event: ProgressEvent) => {
         this.url = (<FileReader>event.target).result;
         console.log(this.url)
         console.log(reader.readAsDataURL(this.url)
         )
       }
       reader.readAsDataURL(event.target.files[0]);
     }
   }*/


  toBase64 = (file: any) => new Promise((resolve, reject) => {
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  }).then((res: any) => {
    this.image = res
  });



}

