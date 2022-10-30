import { mdiEmailFast, mdiFaceWoman, mdiFlaskEmpty } from "@mdi/js";
import { version } from "react";
//client_id = 1 -> بروکس  
//client_id = 2 -> آریا
//client_id = 3 -> پایدار
const hostName = `http://localhost:8000`
const searchPersonUrl = `${hostName}/person/v1/person` // ادرس جستجوی مذاکره کننده
const startInstanceUrl = `${hostName}/camunda/v1/startInstance` // ادرس ثبت مذاکره کننده و شروع فرآیند کموندا
// این آدرس نیاز به client_id دارد

const  customerSearch= `${hostName}/customer/v1/customer?` // آدرس جستجوی مشتری 

const guestManageUrl = `${hostName}/guest/v1/guest` //آدرس لیست بازدیدکنندگان

const cityUrl  = `${hostName}/main/province` //آدرس  لیست شهر ها

export default function apis({Axios,getState,getDateAndTime,arabicToFarse}) {

    //let token = getState().token;
    //Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return {

      // ***************** لیست مذاکره کنندگان ******************
      async mozakere_konandegan(parameter){
        let client_id = getState().client_id
        // debugger
        //به هر دلیل اگر مشکلی وجود داشت ریترن آرایه خالی
        let {city, activityZone} = parameter;
        if(!city) {city = ''}
        if(!activityZone) {activityZone = null}

        if(!city && !activityZone){return []}
        if(city === 'تهران'){}

        //prepare Body for person search
        let apiBody = {
          "client": client_id, // با توجه به غرفه ای که درخواست میکند 
          "city": city,
          "market": activityZone,
          // "province": "فارس",
        }
        let result;
        try{
          result = await Axios.post(searchPersonUrl, apiBody)
        }
        catch(err){
          // debugger
          return 'خطا در دریافت لیست مذاکره کنندگان' //If api request leading to an error // این را نشان نمی دهد
        }

        let resMapping = result.data.map((o) => {
          let name;
          if(o.desk_number != ''){name = `${o.full_name} - میز(${o.desk_number})`}
          if(o.profile_photo_url) {
            o.profile_photo_url = `${hostName}${o.profile_photo_url}`
          }
          return {
            id: o.id,
            name: name,
            city: o.city,
            status: o.status,
            username: o.username,
            src: o.profile_photo_url,
          }
          // let userObjects = {}
          // if(o.desk_number != ''){userObjects['name'] = `${o.full_name} - میز(${o.desk_number})`}
          // userObjects['id'] = o.id
          // userObjects['city'] = `${o.city}`
          // userObjects['status'] = o.status
          // userObjects['username'] = o.username
          // // userObjects['src'] = o.profile_photo ? o.profile_photo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIj7LVBotuZaoKhS2J07YHxtBYEeFdj4NIVMhPUhMBQ&s'
          // if(o.profile_photo_url) {
          //   userObjects['src'] = `${hostName}${o.profile_photo_url}`
          // }

          // return userObjects
        })
        return resMapping
        
        return [
            {name:'محمد فیض',city:'تهران',id:'0',src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIj7LVBotuZaoKhS2J07YHxtBYEeFdj4NIVMhPUhMBQ&s'},
            {name:'محمد فیض',city:'تهران',id:'1'},
            {name:'محمد فیض',city:'تهران',id:'2',src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIj7LVBotuZaoKhS2J07YHxtBYEeFdj4NIVMhPUhMBQ&s'},
            {name:'محمد فیض',city:'تهران',id:'3'},
            {name:'محمد فیض',city:'تهران',id:'4',src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIj7LVBotuZaoKhS2J07YHxtBYEeFdj4NIVMhPUhMBQ&s'},
            {name:'محمد فیض',city:'تهران',id:'5'},
            {name:'محمد فیض',city:'تهران',id:'6',src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIj7LVBotuZaoKhS2J07YHxtBYEeFdj4NIVMhPUhMBQ&s'},
            {name:'محمد فیض',city:'تهران',id:'7',src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIj7LVBotuZaoKhS2J07YHxtBYEeFdj4NIVMhPUhMBQ&s'},
            {name:'محمد فیض',city:'تهران',id:'8'},
            {name:'محمد فیض',city:'تهران',id:'9',src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIj7LVBotuZaoKhS2J07YHxtBYEeFdj4NIVMhPUhMBQ&s'},
            {name:'محمد فیض',city:'تهران',id:'10',src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIj7LVBotuZaoKhS2J07YHxtBYEeFdj4NIVMhPUhMBQ&s'},
            {name:'محمد فیض',city:'تهران',id:'11',src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIj7LVBotuZaoKhS2J07YHxtBYEeFdj4NIVMhPUhMBQ&s'},
            {name:'محمد فیض',city:'تهران',id:'12',src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIj7LVBotuZaoKhS2J07YHxtBYEeFdj4NIVMhPUhMBQ&s'},
            {name:'محمد فیض',city:'تهران',id:'13',src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIj7LVBotuZaoKhS2J07YHxtBYEeFdj4NIVMhPUhMBQ&s'},
            {name:'محمد فیض',city:'تهران',id:'14',src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIj7LVBotuZaoKhS2J07YHxtBYEeFdj4NIVMhPUhMBQ&s'},
            {name:'محمد فیض',city:'تهران',id:'15',src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIj7LVBotuZaoKhS2J07YHxtBYEeFdj4NIVMhPUhMBQ&s'},
            {name:'محمد فیض',city:'تهران',id:'16',src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIj7LVBotuZaoKhS2J07YHxtBYEeFdj4NIVMhPUhMBQ&s'}
        ]
      },

      // ***************** استعلام ******************
      async estelam(obj){
        let client_id = getState().client_id
        //obj => آبجکت اطلاعات پر شده در فرم استعلام

        // مپ کردن دیتای فرانت به بک اند
        // return resMapping
        // return [
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
        // ]
        let mapObj = {
          first_name: obj['firstname'],
          last_name: obj['lastname'], 
          phone_number: obj['mobile'],
          province: obj['city'],
          b1_code: obj['cardcode'],
          market: obj['activityZone'],
          phone: obj['phone'],
          company_name: obj['company'],
        }

        let url = `${customerSearch}`
        let result;
        let is_guest;

        function right(str, chr) {
          return str.slice(str.length-chr,str.length);
        }

        // برای فیلدهای موجود در فرم آدرس جدید ایجاد می شود
        for(let key in mapObj){
          if (mapObj[key] != undefined){
            if(right(url, 1) != '?'){
              url = url.concat('&')
            }
            if(key == 'phone_number'){
              mapObj[key] = right(mapObj[key], 10)
            }
            mapObj[key] = mapObj[key].trim()
            // console.log(`${key}: ${mapObj[key]}`);
            url = url.concat(`${key}=${mapObj[key]}`)
          }
        }
        
        url = url.concat(`&client_id=${client_id}`) // set client_id based on client
        try{
          result = await Axios.get(url)
          // debugger
          if(result.data.length == 0){
            // debugger
            return []
          }
        }
        catch(err){
          // debugger
          return []
        }
        if (result.data.error){
          // return result.data.error.errorMessage
          return []
        }
        if(result.data.Guest){
          is_guest = result.data.Guest
        }
        
        let resMapping = result.data.data.map((o) => {
          return {
            guest_id: o.id,
            firstname: o.first_name,
            lastname: o.last_name,
            mobile: o.mobile_number || o.mobile_number1,
            address: o.address || o.address1,
            city: o.province || o.city,
            phone: o.phone,
            gender: o.gender,
            cardCode: o.b1_code,
            activityZone: o.market,
            company: o.company_name,
            position: o.post_in_company,
            is_guest: is_guest
          }
        })
        // debugger
        return resMapping
        return [
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',mozakere_konande:undefined},
        ]
      },
      async cities(){
        let url  = cityUrl
        let result;
        try{
          result = await Axios.get(url)
        }
        catch(err){
          return [          
          'تهران',
          'مشهد',
          'اصفهان',
          'تبریز',
          'قم',
          'یزد',
        ]
        }
        let city = result.data.map((o) => o.city)
        return city
      },
      //در صورت موفقیت در ثبت ریترن ترو
      //در صورت خطا در ثبت ریترن متن خطا

      // ***************** ثبت بازدید کننده ******************
      async sabte_bazdid_konande({model,type, mozakere_konandegan}){
        let operatarUserName = getState().username
        let client_id = getState().client_id
        let mozakere_konande_obj;
        let negotiator;
        let is_new;
        try{
          mozakere_konande_obj = mozakere_konandegan.find((x)=>{
            return x.id === model.mozakere_konande
          })
        }
        catch(err){
          mozakere_konande_obj = {}
        }
        if(mozakere_konande_obj != undefined){
          negotiator = mozakere_konande_obj.username
        }else{
          negotiator = undefined
        }

        if(model.is_guest == true){
          is_new = false
          // debugger
        }
        else if(type == 'edit'){
          is_new = false
          // debugger
        }
        else{
          is_new = true
          // debugger
        }
        
        let result;
        // let {user} = getState()
        // if(model.activityZone == 'الکتریکی'){model.activityZone = ''}
        let apiBody = {
          guest_id: model.guest_id,
          is_new: is_new,
          first_name: model.firstname || '',
          last_name: model.lastname || '',
          address: model.address || '',
          gender: model.gender,
          mobile_number: model.mobile || '',
          phone: model.phone || '',
          market: model.activityZone,
          post_in_company: model.position || '',
          company_name: model.company || '',
          province: model.city,
          assignee: negotiator,//mozakere_konande_obj.name || undefined, // برای این شخص یک وظیفه ایجاد می گردد
          person_id: model.mozakere_konande, // باید بعد پیاده سازی لاگین  مقدار مناسب برگردد
          person: model.mozakere_konande, // باید بعد پیاده سازی لاگین  مقدار مناسب برگردد
          // initiator_id: 1, // آی دی شخصی که فرآیند را شروع کرده است
          initiator_name: operatarUserName,// نام شخصی که فرآیند را شروع کرده است
          b1_code: model.cardCode || '',
          catalog: model.catalog || "False", // زمانی که تیک مربوط به آن فعال شد مقدار درست برگردد
          guest_insert_type: type, // مشخص کردن اینکه آیا فرم ویرایش می شود یا یک مورد جدید ثبت می شود.
          instance: model.instance,
          // is_new: false,
          // state: 1, //ثبت اطلاعات باردید کننده
          form_data: model, // اطلاعات کل فرم
          // contact_person_of_company: '',  
          // visit_card: model.visitCard, // فایل
        }
        // debugger
        let url = `${startInstanceUrl}/${client_id}/` // client_id = با توجه به غرفه ای که لاگین کرده است
        
        if(model.visitCard) { // اگر فایل آپلود شد
          let formData = new FormData();
          formData.append('visit_card', model.visitCard)
          
          for (const key in apiBody) {
            console.log(`first: ${key}`, apiBody[key])
            if(apiBody[key] !== null ){
              if(apiBody[key] != undefined){
                if(key != 'form_data'){ //این شرط برای اینه که باید فرم دیتا درد دیتابیس به صورت استرینگی فای ریخته شود
                  formData.append(key, apiBody[key])
                  console.log(`${key}`, apiBody[key])
                }
              }
            }
          }
          formData.append('form_data', JSON.stringify(model))
          if(model.gender == undefined){
            formData.append('gender', 'U')
            // debugger
          }
          // debugger
          try{
            result = await Axios.post(url, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              }
            })

          }
          catch (err) {
            // debugger
            let error;
            if(err.response.data){error = err.response.data.error}else{error=''}
            if(error){
              return  error.errorMessage
            }
            else{
              return 'خطای نامشخص'
            }
          }
        }
        else{ // اگر فایل آپلود نشود
          try{
            result = await Axios.post(url, apiBody)
          }
          catch (err) {
            // debugger
            let error;
            if(err.response.data){error = err.response.data.error}else{error=''}
            if(error){
              return  error.errorMessage
            }
            else{
              return 'خطای نامشخص'
            }
          }
        }

        //model => آبجکت بازدید کننده
        //type => 'add' or 'edit' تایین کننده این که داریم بازدید کننده اضافه می کنیم یا ویرایش می کنیم 
        //اگر عملیات ثبت موفقیت آمیز بود ریترن ترو و گر نه ریترن فالس
        return true
      },

      // ***************** لیست بازدید کنندگان  ******************
      async bazdid_konandegan(){
        let operatarUserName = getState().username
        let client_id = getState().client_id
        // return [
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'0',date:'1401/2/3 12:30',catalog:true},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'1',date:'1401/2/3 12:30',catalog:true},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'2',date:'1401/2/3 12:30',catalog:true},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'3',date:'1401/2/3 12:30',catalog:true},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'0',date:'1401/2/3 12:30',catalog:true},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'1',date:'1401/2/3 12:30',catalog:true},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'2',date:'1401/2/3 12:30',catalog:true},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'3',date:'1401/2/3 12:30',catalog:true},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'0',date:'1401/2/3 12:30',catalog:true},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'1',date:'1401/2/3 12:30',catalog:true},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'2',date:'1401/2/3 12:30',catalog:true},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'3',date:'1401/2/3 12:30',catalog:true},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'0',date:'1401/2/3 12:30',catalog:true},
        //   {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'1',date:'1401/2/3 12:30',catalog:true}
        // ]

        let initiator_id = 1
        let url = guestManageUrl
        let apiBody = {
          client: client_id,
          initiator_name: operatarUserName,
          // initiator_id: 1,
        }
        // url = url.concat(`client_id=${client_id}&initiator_id=${initiator_id}`)
        let result;
        // debugger
        try{
          result = await Axios.post(url, apiBody)
        }
        catch(err){
          // debugger
          return []
        }
        let state;
        let created_at;
        let resMapping = result.data.results.map((o) => {

          if(o.state == 1){state = 0} // ثبت اطلاعات
          if(o.state == 2){state = 1} //در انتظار مذاکره
          if(o.state == 3){state = 2} // در حال مذاکره
          if(o.state == 4){state = 3} // پایان مذاکره'
          if(o.state == 5){state = 4} // انصراف از مذاکره
          created_at = new Date(o.created_at).toISOString(o.created_at).replace('T', ' ').replace('Z', '')
          created_at = `${new Date(created_at).toLocaleTimeString('fa-IR')} ${new Date(created_at).toLocaleDateString('fa-IR')}`

          return {
            guest_id: o.id || undefined,
            firstname: o.first_name ,
            lastname: o.last_name,
            gender: o.gender || undefined,
            mobile:o.mobile_number,
            city: o.province,
            address: o.address || undefined,
            phone: o.phone || undefined,
            cardCode: o.b1_code || undefined,
            activityZone: o.market || undefined,
            mozakere_konande : o.person || undefined,
            status: state ,
            position: o.post_in_company || undefined,
            company: o.company_name || undefined,
            name_mozakere_konande: o.assignee || undefined,
            catalog: o.catalog || undefined,
            date: created_at ,
            instance: o.instance || undefined,
          }
        })
        return resMapping
        return [
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'0',date:'1401/2/3 12:30'},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'1',date:'1401/2/3 12:30'},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'2',date:'1401/2/3 12:30'},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'3',date:'1401/2/3 12:30'},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'0',date:'1401/2/3 12:30'},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'1',date:'1401/2/3 12:30'},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'2',date:'1401/2/3 12:30'},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'3',date:'1401/2/3 12:30'},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'0',date:'1401/2/3 12:30'},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'1',date:'1401/2/3 12:30'},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'2',date:'1401/2/3 12:30'},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'3',date:'1401/2/3 12:30'},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'0',date:'1401/2/3 12:30'},
          {firstname:'محمد',lastname:'فیض',mobile:'09123534314',city:'تهران',cardCode:'123456',activityZone:'الکتریکی',name_mozakere_konande:'مهدی شاد',status:'1',date:'1401/2/3 12:30'}
        ]
      }
    }
  }