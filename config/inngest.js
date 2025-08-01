import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

//Inngest function to save user data to db

export const syncUserCreation=inngest.createFunction(
    {
        id:'sync-user-from-clerk'
    },
    {event: 'clerk/userAgent.created'},
    async({event})=>{
        const{id,first_name,last_name,email_addresses,image_url}=event.data
        const userData={
            _id:id,
            email: email_addresses[0].email._address,
            name: first_name+ ' ' + last_name,
            imageURL: image_url
        }

        await connectDB()
        await User.create(userData)

    }
)

//INngest function to update user data in database
export const syncUserUpdation= inngest.createFunction(
    {
        id:'update-user-from-clerk'
    },
    {event:'clerk/user.updated'},
    async({event})=>{
        const{id,first_name,last_name,email_addresses,image_url}=event.data
        const userData={
            _id:id,
            email: email_addresses[0].email._address,
            name: first_name+ ' ' + last_name,
            imageURL: image_url
        }
        await connectDB()
        await User.findByIdAndUpdate(id,userData)
    }
)

//Inngest fucntion to delete user from db

export const syncUSerDeletion=inngest.createFunction(
    {
        id:'delete-user-with-clerk'
    },
    {event: 'clerk/user.deleted'},
    async({event})=>{
        const{id}=event.data

        await connectDB
        await User.findByIdAndDelete(id)
    }
)


