const cartController = {
  addToCart: async (req, res) => {
    try {
      const { id } = req.params;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = cartController;
