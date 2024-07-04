import express from 'express'
import Message from '../models/MessageModel.js'

//add
// router.post('/', 
export const addMsg= async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage= await newMessage.save();
        res.status(200).send(savedMessage);
        

        
    } catch (error) {
        res.status(500).send(error);
        
    }
};




//get messages

// router.get("/:conversationId", 
export const getMsgs = async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
