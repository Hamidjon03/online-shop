const filtering = (category, from, to, region) => {
  let filtering;

  // If exist all og them
  if (category && from && to && region) {
    filtering = {
      category,
      amount: { $gte: from, $lte: to },
      region
    }
  }

  // If exist only category
  if (category && !from && !to && !region) {
    filtering = {
      category
    }
  }

  // If exist category and region
  if (category && !from && !to && region) {
    filtering = {
      category,
      region
    }
  }

  // If exist category and region and from
  if (category && from && !to && region) {
    filtering = {
      category,
      region,
      amount: { $gte: from }
    }
  }

  // If exist category and region and to
  if (category && !from && to && region) {
    filtering = {
      category,
      region,
      amount: { $lte: to }
    }
  }

  // If exist category and from
  if (category && from && !to && !region) {
    filtering = {
      category,
      amount: { $gte: from }
    }
  }

  // If exist category and to
  if (category && !from && to && !region) {
    filtering = {
      category,
      amount: { $lte: to }
    }
  }

  // If exist category from and to
  if (category && from && to && !region) {
    filtering = {
      category,
      amount: { $gte: from, $lte: to }
    }
  }

  // If exist only from 
  if (!category && from && !to && !region) {
    filtering = {
      amount: { $gte: from }
    }
  }

  // If exist from and to
  if (!category && from && to && !region) {
    filtering = {
      amount: { $gte: from, $lte: to }
    }
  }

  // If exist from and to and region
  if (!category && from && to && region) {
    filtering = {
      amount: { $gte: from, $lte: to },
      region
    }
  }

  // If exist from and region
  if (!category && from && !to && region) {
    filtering = {
      amount: { $gte: from },
      region
    }
  }

  // If exist only to
  if (!category && !from && to && !region) {
    filtering = {
      amount: { $lte: to },
    }
  }

  // If exist to and region
  if (!category && !from && to && region) {
    filtering = {
      amount: { $lte: to },
      region
    }
  }

  // If exist only region
  if (!category && !from && !to && region) {
    filtering = {
      region
    }
  }

  // If exist any of them
  if (!category && !from && !to && !region) {
    filtering = {}
  }

  return filtering
}

module.exports = filtering