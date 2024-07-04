import express from 'express';
import Conversation from '../models/ConversationModel.js'

//create convo
export const createConv = async (req, res)=>{
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    });

    try {
        const savedConversation=await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
};



// //get the conversation
// router.get('/:userId', 
export const getConv = async(req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: req.params.userId}
        });
        console.log(conversation)
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
}


// get conv includes two userId


export const getConvOf2Ids = async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
