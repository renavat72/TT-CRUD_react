const { UserInputError } = require('apollo-server');
const mongoose = require('mongoose');
const UserModal = require('./models')

const resolvers = {
    
    Query:{
       async user(_,{id}){
         const findUser = await UserModal.findById(id);
         return findUser;
       
       },
       async users(_,{skip, limit}){
        try {
            const user = await UserModal.find().sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            return user;
          } catch (err) {
            throw new Error(err);
          }
       }
    },
    Mutation:{
        async createUser(_,{input:{email, name}}){
            const newUser = new UserModal({
              email, name
            })
           const user = await newUser.save();
           return user

        },
        async updateUser(_,{id,input:{email, name}}){
           const user = await UserModal.findOneAndUpdate({_id: id}, {email:email, name:name});
           if (!user) {
            throw new Error('User Not Found');
          }
          return user;
        },
        async deleteUser(_,{id}){
            const user = await UserModal.findByIdAndDelete(id);
            return user
        },

    },
}
module.exports = resolvers;
