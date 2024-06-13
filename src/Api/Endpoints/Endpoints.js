

export const endpoints={
    auth:{
        forgetpw: "forget-password",
        dashboard: "user/dashboard",
        updatepw: "update-password"
    },
    cms: {
        viewproduct: "product",
        productdetails: "edit/product",
        create: "create/product",
        delete: "delete/product",
        edit: "update/product"
    }
}

export const successNotificationsEndpoints=[
    endpoints.auth.forgetpw,
    endpoints.auth.dashboard,
    endpoints.auth.updatepw,
    endpoints.cms.viewproduct,
    endpoints.cms.productdetails,
    endpoints.cms.create,
    endpoints.cms.delete,
    endpoints.cms.edit
    
]