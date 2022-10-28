module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'Doctor_Info',
                'specialtyId',
                {
                    type: Sequelize.INTEGER
                }
            )
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Doctor_Info', 'specialtyId')
        ]);
    }
};