def generate_qc_summary(batch_id, predicted, actual, status):
    diff = round(actual - predicted, 2)

    if status == "Approved":
        return (
            f"Batch {batch_id} meets all quality requirements. "
            f"The deviation between predicted and actual purity is {diff}%, "
            "which is within acceptable tolerance limits. "
            "The batch is approved for release."
        )

    return (
        f"Batch {batch_id} shows a purity deviation of {diff}%. "
        "This exceeds acceptable quality limits. "
        "Further investigation and corrective action are recommended "
        "before batch release."
    )
